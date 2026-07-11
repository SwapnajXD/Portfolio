"use client";

import { useState } from "react";
import Link from "next/link";

const webring = ["cyberdungeon", "pixelforge", "modemzone", "byteattic"];

export default function WhoAmIReveal() {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div
        style={{
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
          background:
            "repeating-linear-gradient(45deg, #1a0033, #1a0033 10px, #2b0055 10px, #2b0055 20px)",
          color: "#00ff00",
          minHeight: "70vh",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "#000080",
            border: "4px ridge #c0c0c0",
            padding: 16,
          }}
        >
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              background: "#000000",
              border: "2px inset #c0c0c0",
              padding: "4px 0",
              marginBottom: 16,
            }}
          >
            <span className="retro-marquee inline-block text-sm text-[#ffff00]">
              🚧 UNDER CONSTRUCTION 🚧 BEST VIEWED IN NETSCAPE NAVIGATOR AT
              800x600 🚧 SIGN MY GUESTBOOK 🚧 DIAL-UP FRIENDLY 🚧
            </span>
          </div>

          <h1
            className="retro-rainbow"
            style={{ fontSize: 32, textAlign: "center", margin: "0 0 4px" }}
          >
            ~*~ swapnaj's homepage ~*~
          </h1>
          <p style={{ textAlign: "center", color: "#ffff00", marginTop: 0 }}>
            <span className="retro-blink">★ NEW ★</span> you found the hidden
            directory <span className="retro-blink">★ NEW ★</span>
          </p>

          <hr style={{ border: "1px dashed #00ff00" }} />

          <p style={{ color: "#00ffff", lineHeight: 1.6 }}>
            hi and welcome 2 my page!! i am swapnaj and i like clouds ☁️
            (the aws kind not the sky kind lol) and devops and building cool
            stuff. this page is optimized for a 56k modem so please b patient
            while it loads.
          </p>

          <div
            style={{
              background: "#000000",
              border: "2px inset #c0c0c0",
              padding: 8,
              textAlign: "center",
              color: "#00ff00",
              fontFamily: "monospace",
              margin: "16px 0",
            }}
          >
            you are visitor number
            <br />
            <span style={{ fontSize: 28, letterSpacing: 4, color: "#ff00ff" }}>
              001337
            </span>
            <br />
            <span style={{ fontSize: 10, color: "#888" }}>
              (counter not guaranteed to be accurate, or real)
            </span>
          </div>

          <div
            style={{
              border: "2px groove #c0c0c0",
              padding: 12,
              background: "#000040",
              marginBottom: 16,
            }}
          >
            <p
              style={{ color: "#ffff00", margin: "0 0 6px", fontWeight: "bold" }}
            >
              📖 guestbook
            </p>
            <p style={{ color: "#c0c0c0", fontSize: 13, margin: "0 0 4px" }}>
              <b style={{ color: "#00ffff" }}>xX_h4x0r_Xx</b> wrote: nice site
              dude, 5 stars ⭐⭐⭐⭐⭐
            </p>
            <p style={{ color: "#c0c0c0", fontSize: 13, margin: "0 0 4px" }}>
              <b style={{ color: "#00ffff" }}>anonymous</b> wrote: how do i
              leave a message here
            </p>
            <p style={{ color: "#c0c0c0", fontSize: 13, margin: 0 }}>
              <b style={{ color: "#00ffff" }}>swapnaj</b> wrote: you
              can&apos;t, it&apos;s not real. nice find though
            </p>
          </div>

          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ color: "#00ff00" }}>⟵ prev</span>
            {" | "}
            <span style={{ color: "#00ff00" }}>webring</span>
            {" | "}
            <span style={{ color: "#00ff00" }}>next ⟶</span>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
              proud member of the{" "}
              {webring.map((site, i) => (
                <span key={site}>
                  {i > 0 && ", "}
                  <span style={{ color: "#ff8800" }}>{site}.neocities.org</span>
                </span>
              ))}{" "}
              webring
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {["800x600", "NETSCAPE READY", "56K OR BUST", "HTML 3.2"].map(
              (badge) => (
                <span
                  key={badge}
                  style={{
                    border: "1px solid #00ff00",
                    color: "#00ff00",
                    fontSize: 10,
                    padding: "3px 6px",
                    fontFamily: "monospace",
                  }}
                >
                  {badge}
                </span>
              )
            )}
          </div>

          <hr style={{ border: "1px dashed #00ff00" }} />

          <p style={{ textAlign: "center", fontSize: 11, color: "#888" }}>
            © 1999-2026 swapnaj&apos;s homepage. last updated: whenever i felt
            like it. webmaster:{" "}
            <a
              href="mailto:swapnaj0806@gmail.com"
              style={{ color: "#00ffff" }}
            >
              swapnaj0806@gmail.com
            </a>
          </p>

          <p style={{ textAlign: "center" }}>
            <button
              onClick={() => setRevealed(false)}
              style={{
                color: "#ff00ff",
                fontFamily: "monospace",
                fontSize: 13,
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              ← cd .. (back to the boring version)
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-16 font-mono text-sm">
      <p className="text-text-muted">$ whoami</p>
      <p className="mt-2 text-text-primary">
        swapnaj — cloud & devops, currently pretending this terminal is real.
      </p>
      <p className="mt-6 text-text-muted">$ cat curiosity.log</p>
      <p className="mt-2 text-text-primary">
        you checked a route that isn&apos;t linked anywhere. respect.
      </p>
      <p className="mt-6 text-text-muted">
        $ echo &quot;nothing else to see here, promise&quot;
      </p>
      <p className="mt-2 text-accent">nothing else to see here, promise</p>
      <p className="mt-6 text-text-muted">$ ls -la ~</p>
      <p className="mt-2 text-text-primary">
        drwxr-xr-x  projects/
        <br />
        drwxr-xr-x  journal/
        <br />
        <span className="text-text-muted">drwx------  </span>
        <button
          onClick={() => setRevealed(true)}
          className="text-accent hover:underline"
        >
          .neocities/
        </button>
        <span className="text-text-muted"> # circa 1999, do not enter</span>
      </p>
      <Link
        href="/"
        className="mt-10 inline-block w-fit font-mono text-xs text-accent hover:underline"
      >
        ← cd ~
      </Link>
    </div>
  );
}
