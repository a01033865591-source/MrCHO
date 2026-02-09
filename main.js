

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

  /* 문의하기 폼 제출 처리 */
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 기본 제출 동작 방지

        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        const subject = `문의: ${name} (${email})`;
        const body = `이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`;

        // mailto 링크 생성 및 열기
        // encodeURIComponent를 사용하여 특수 문자가 올바르게 인코딩되도록 합니다.
        window.location.href = `mailto:jss5591@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  });
