"use client";

import { useState } from "react";
import { EMAIL, EMAIL_HREF } from "@/lib/constants";

const webring = ["cyberdungeon", "pixelforge", "modemzone", "byteattic"];

export default function IEApp() {
  const [midiPlaying, setMidiPlaying] = useState(true);

  return (
    <div
      style={{
        fontFamily: "Verdana, Arial, sans-serif",
        background: "#E8EEF7",
        color: "#000000",
        minHeight: "100%",
      }}
    >
      <div style={{ background: "#FFFFFF" }}>
        <div
          style={{
            background: "linear-gradient(180deg, #0052CC 0%, #003399 100%)",
            padding: "14px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold" }}>
            swapnaj&apos;s homepage
          </div>
          <div style={{ color: "#CFE0FF", fontSize: 11, marginTop: 2 }}>
            cloud &amp; devops portal — est. 1999
          </div>
        </div>

        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            background: "#003399",
            borderTop: "1px solid #001F5C",
            borderBottom: "1px solid #001F5C",
            padding: "4px 0",
          }}
        >
          <span className="retro-marquee inline-block text-xs font-bold text-[#FFCC00]">
            🚧 UNDER CONSTRUCTION 🚧 BEST VIEWED IN INTERNET EXPLORER 5.0 AT
            800x600 🚧 SIGN MY GUESTBOOK 🚧 DIAL-UP FRIENDLY 🚧
          </span>
        </div>

        <div
          style={{
            background: "linear-gradient(90deg, #FFCC00, #FF9900)",
            border: "2px outset #FFDD55",
            margin: 12,
            padding: 10,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: "bold", color: "#CC0000" }}>
            🎉 YOU ARE THE 1,000,000th VISITOR! 🎉
          </div>
          <div style={{ fontSize: 11 }}>
            click here to claim your prize (there is no prize)
          </div>
        </div>

        <div style={{ padding: "0 16px 16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              margin: "12px 0",
              flexWrap: "wrap",
            }}
          >
            <span style={{ border: "2px outset #D4D0C8", background: "#ECECEC", padding: "4px 10px", fontSize: 11 }}>
              ⭐ Add to Favorites
            </span>
            <span style={{ border: "2px outset #D4D0C8", background: "#ECECEC", padding: "4px 10px", fontSize: 11 }}>
              🏠 Set as Homepage
            </span>
          </div>

          <p style={{ textAlign: "center", color: "#CC0000", fontSize: 12 }}>
            <span className="retro-blink">★ NEW ★</span> now with 16-bit
            color and a hit counter <span className="retro-blink">★ NEW ★</span>
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #CCCCCC" }} />

          <p style={{ lineHeight: 1.6, fontSize: 13 }}>
            Hi and welcome to my page! I am Swapnaj and I like clouds ☁️ (the
            AWS kind, not the sky kind) and devops and building cool stuff.
            This site is optimized for a 56k modem, so please be patient
            while it loads.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
            {[
              { icon: "🏆", label: ["Cool Site", "of the Day"] },
              { icon: "🌐", label: ["IE 5.0", "Optimized"] },
              { icon: "🎖️", label: ["Portal Choice", "Award 1999"] },
            ].map((award) => (
              <div
                key={award.icon}
                style={{ border: "2px outset #D4D0C8", background: "#ECECEC", padding: "6px 10px", textAlign: "center", fontSize: 9, color: "#003399", width: 74 }}
              >
                <div style={{ fontSize: 20 }}>{award.icon}</div>
                {award.label.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ border: "2px inset #D4D0C8", background: "#ECECEC", padding: 8, textAlign: "center", margin: "16px 0" }}>
            <button
              onClick={() => setMidiPlaying((p) => !p)}
              style={{ background: "#FFFFFF", border: "1px solid #999999", color: "#003399", fontSize: 11, padding: "4px 8px", cursor: "pointer" }}
            >
              {midiPlaying
                ? "🎵 now playing: tubular_bells.mid [pause]"
                : "🔇 midi paused, your ears thank you [resume]"}
            </button>
            <div style={{ fontSize: 9, color: "#666666", marginTop: 4 }}>
              (relax, there&apos;s no real audio. i&apos;m not a monster)
            </div>
          </div>

          <div style={{ background: "#000000", border: "2px inset #D4D0C8", padding: 8, textAlign: "center", color: "#00FF00", fontFamily: "monospace", margin: "16px 0" }}>
            you are visitor number
            <br />
            <span style={{ fontSize: 26, letterSpacing: 4 }}>001337</span>
            <br />
            <span style={{ fontSize: 10, color: "#888888" }}>
              (counter not guaranteed to be accurate, or real)
            </span>
          </div>

          <div style={{ border: "1px solid #99B3D9", padding: 12, background: "#F0F4FB", marginBottom: 16 }}>
            <p style={{ color: "#003399", margin: "0 0 6px", fontWeight: "bold", fontSize: 13 }}>📖 guestbook</p>
            <p style={{ fontSize: 12, margin: "0 0 4px" }}>
              <b style={{ color: "#0000EE" }}>xX_h4x0r_Xx</b> wrote: nice site dude, 5 stars ⭐⭐⭐⭐⭐
            </p>
            <p style={{ fontSize: 12, margin: "0 0 4px" }}>
              <b style={{ color: "#0000EE" }}>anonymous</b> wrote: how do i leave a message here
            </p>
            <p style={{ fontSize: 12, margin: 0 }}>
              <b style={{ color: "#0000EE" }}>swapnaj</b> wrote: you can&apos;t, it&apos;s not real. nice find though
            </p>
          </div>

          <div style={{ border: "1px solid #99B3D9", padding: 12, background: "#F0F4FB", marginBottom: 16 }}>
            <p style={{ color: "#003399", margin: "0 0 6px", fontWeight: "bold", fontSize: 13 }}>🔗 my top 5 links</p>
            <ol style={{ color: "#0000EE", fontSize: 12, margin: 0, paddingLeft: 20 }}>
              <li style={{ textDecoration: "underline" }}>AltaVista (best search engine, fight me)</li>
              <li style={{ textDecoration: "underline" }}>Ask Jeeves</li>
              <li style={{ textDecoration: "underline" }}>Encarta 98 — all the world&apos;s knowledge, on 4 CDs</li>
              <li style={{ textDecoration: "underline" }}>Neopets</li>
              <li style={{ textDecoration: "underline" }}>my geocities neighbor&apos;s site (also under construction)</li>
            </ol>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#003399", margin: "0 0 6px", fontWeight: "bold", fontSize: 13 }}>✨ fun facts about me</p>
            <ul style={{ fontSize: 12, margin: 0, paddingLeft: 20 }}>
              <li><span className="retro-blink">★</span> i once fixed a prod outage at 3am and lived to tell the tale</li>
              <li><span className="retro-blink">★</span> my homelab has better uptime than most startups</li>
              <li><span className="retro-blink">★</span> this page took longer to build than some of my real projects</li>
              <li><span className="retro-blink">★</span> yes, this is now running inside a fake Windows 98 too</li>
            </ul>
          </div>

          <div style={{ textAlign: "center", marginBottom: 16, fontSize: 12 }}>
            <span style={{ color: "#0000EE" }}>⟵ prev</span> |{" "}
            <span style={{ color: "#0000EE" }}>webring</span> |{" "}
            <span style={{ color: "#0000EE" }}>next ⟶</span>
            <div style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>
              proud member of the{" "}
              {webring.map((site, i) => (
                <span key={site}>
                  {i > 0 && ", "}
                  <span style={{ color: "#0000EE" }}>{site}.neocities.org</span>
                </span>
              ))}{" "}
              webring
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["800x600", "IE 5.0 READY", "56K OR BUST", "HTML 3.2", "POWERED BY FRONTPAGE 98", "NO FRAMES USED", "RSS 2.0 READY", "Y2K COMPLIANT"].map((badge) => (
              <span key={badge} style={{ border: "2px outset #D4D0C8", background: "#ECECEC", color: "#003399", fontSize: 9, padding: "3px 6px" }}>
                {badge}
              </span>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #CCCCCC" }} />

          <p style={{ textAlign: "center", fontSize: 10, color: "#999999" }}>
            this page has been visited by aliens 👽 (unconfirmed, pending peer review)
          </p>

          <p style={{ textAlign: "center", fontSize: 11, color: "#666666" }}>
            © 1999-2026 swapnaj&apos;s homepage. webmaster:{" "}
            <a href={EMAIL_HREF} style={{ color: "#0000EE" }}>
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
