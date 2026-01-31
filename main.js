/* 계산기 */
  function calcTravel() {
    const days = Number(document.getElementById("days").value);
    const daily = Number(document.getElementById("daily").value);
    if (!days || !daily) {
      document.getElementById("travelResult").innerText = "값을 모두 입력해주세요.";
      return;
    }
    document.getElementById("travelResult").innerText =
      "예상 총 여행 경비: " + (days * daily).toLocaleString() + "원";
  }

  function calcLife() {
    const income = Number(document.getElementById("income").value);
    const expense = Number(document.getElementById("expense").value);
    if (!income || !expense) {
      document.getElementById("lifeResult").innerText = "값을 모두 입력해주세요.";
      return;
    }
    document.getElementById("lifeResult").innerText =
      "남는 금액: " + (income - expense).toLocaleString() + "원";
  }

  /* 네이버 블로그 RSS 연동 */
  const RSS_URL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://rss.blog.naver.com/sayme-2024.xml";

  fetch(RSS_URL)
    .then(res => res.json())
    .then(data => {
      const posts = data.items.slice(0, 3);
      const container = document.getElementById("blogPosts");

      posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.description.replace(/<[^>]*>?/gm, "").slice(0, 120)}...</p>
          <a href="${post.link}" target="_blank">글 보러가기 →</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById("blogPosts").innerHTML =
        "<p>블로그 글을 불러올 수 없습니다.</p>";
    });