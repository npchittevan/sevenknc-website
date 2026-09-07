import { useRef, useState } from "react";
import { SITE } from "../data/siteConfig.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

// Renders only when a video asset is supplied via SITE.videoUrl.
export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  if (!SITE.videoUrl) return null;

  const start = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="section section--dark" id="video">
      <div className="container">
        <SectionHeading
          eyebrow="Video"
          title="From Source to Global Supply"
          subtitle="A look inside SevenKNC Global Exim."
          light
        />
        <Reveal className="video__wrap">
          <div className="video__player">
            <video
              ref={videoRef}
              src={SITE.videoUrl}
              poster={SITE.videoPoster || undefined}
              controls={playing}
              playsInline
              preload="none"
            >
              Your browser does not support the video tag.
            </video>
            {!playing && (
              <button className="video__poster" onClick={start} aria-label="Play video">
                {SITE.videoPoster && <img src={SITE.videoPoster} alt="Video poster" />}
                <span className="video__play">
                  <Icon name="play" size={30} />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
