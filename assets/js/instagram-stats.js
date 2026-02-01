document.getElementById("uploadForm")?.addEventListener("submit", async e => {
  e.preventDefault();

  const zipFile = document.getElementById("zipFile").files[0];
  if (!zipFile) return alert("Please select a ZIP file.");

  try {
    const zip = await JSZip.loadAsync(zipFile);

    const followersFile = zip.file(
      "connections/followers_and_following/followers_1.json"
    );
    const followingFile = zip.file(
      "connections/followers_and_following/following.json"
    );

    if (!followersFile || !followingFile) {
      return alert("Required Instagram files not found in ZIP.");
    }

    const followersJSON = JSON.parse(await followersFile.async("string"));
    const followingJSON = JSON.parse(await followingFile.async("string"));

    const extract = data =>
      data
        .filter(e => e.string_list_data?.[0])
        .map(e => e.string_list_data[0].value);

    const followers = new Set(extract(followersJSON));
    const following = new Set(
      extract(followingJSON.relationships_following || [])
    );

    const notFollowingBack = [...following].filter(u => !followers.has(u)).sort();
    const notFollowingYou = [...followers].filter(u => !following.has(u)).sort();
    const mutual = [...followers].filter(u => following.has(u)).sort();

    document.getElementById("results").innerHTML = `
      <h3>People you follow who don't follow you back</h3>
      <ul>${notFollowingBack.map(u => `<li>${u}</li>`).join("")}</ul>
    `;

    document.getElementById("downloadButtons").style.display = "block";

    const download = (name, list) => {
      const blob = new Blob([list.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    };

    document.getElementById("downloadNotFollowingBack").onclick =
      () => download("not_following_you_back.txt", notFollowingBack);

    document.getElementById("downloadNotFollowingYou").onclick =
      () => download("you_dont_follow_back.txt", notFollowingYou);

    document.getElementById("downloadMutualFollowers").onclick =
      () => download("mutual_followers.txt", mutual);

  } catch (err) {
    console.error(err);
    alert("Error processing ZIP file.");
  }
});
