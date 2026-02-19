import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from 'framer-motion';
import { ArrowRight, BookOpen, Home, Sparkles } from 'lucide-react';
import './NotFoundPage.css';

const REDIRECT_SECONDS = 10;

const STAR_FIELD = [
  { top: '6%', left: '12%', size: 2, delay: 0.4, duration: 3.6 },
  { top: '10%', left: '78%', size: 1, delay: 1.2, duration: 4.4 },
  { top: '14%', left: '48%', size: 1, delay: 0.8, duration: 3.9 },
  { top: '18%', left: '88%', size: 2, delay: 1.6, duration: 4.8 },
  { top: '22%', left: '22%', size: 1, delay: 0.2, duration: 4.1 },
  { top: '26%', left: '66%', size: 2, delay: 1.1, duration: 3.5 },
  { top: '30%', left: '8%', size: 1, delay: 0.5, duration: 4.2 },
  { top: '34%', left: '38%', size: 2, delay: 1.9, duration: 3.8 },
  { top: '38%', left: '74%', size: 1, delay: 0.7, duration: 4.6 },
  { top: '42%', left: '92%', size: 2, delay: 1.4, duration: 3.7 },
  { top: '46%', left: '16%', size: 2, delay: 0.9, duration: 4.0 },
  { top: '50%', left: '54%', size: 1, delay: 1.7, duration: 4.9 },
  { top: '54%', left: '82%', size: 2, delay: 0.3, duration: 3.4 },
  { top: '58%', left: '10%', size: 1, delay: 1.5, duration: 4.3 },
  { top: '62%', left: '46%', size: 2, delay: 0.6, duration: 3.9 },
  { top: '66%', left: '70%', size: 1, delay: 1.8, duration: 4.7 },
  { top: '70%', left: '30%', size: 2, delay: 0.1, duration: 3.6 },
  { top: '74%', left: '88%', size: 1, delay: 1.3, duration: 4.5 },
  { top: '78%', left: '12%', size: 2, delay: 0.9, duration: 3.8 },
  { top: '82%', left: '62%', size: 1, delay: 1.6, duration: 4.4 },
  { top: '86%', left: '40%', size: 2, delay: 0.4, duration: 3.7 },
  { top: '90%', left: '92%', size: 1, delay: 1.1, duration: 4.6 },
  { top: '12%', left: '96%', size: 1, delay: 1.4, duration: 4.1 },
  { top: '24%', left: '56%', size: 2, delay: 0.7, duration: 3.5 },
  { top: '36%', left: '60%', size: 1, delay: 1.2, duration: 4.2 },
  { top: '48%', left: '36%', size: 2, delay: 0.8, duration: 3.9 },
  { top: '60%', left: '20%', size: 1, delay: 1.5, duration: 4.3 },
  { top: '72%', left: '52%', size: 2, delay: 0.6, duration: 3.7 },
  { top: '84%', left: '76%', size: 1, delay: 1.8, duration: 4.8 },
  { top: '94%', left: '8%', size: 1, delay: 1.1, duration: 4.0 }
];

const SHARD_FIELD = [
  { top: '10%', left: '18%', rotate: -18, delay: 0.6 },
  { top: '18%', left: '80%', rotate: 24, delay: 1.1 },
  { top: '32%', left: '8%', rotate: -6, delay: 0.3 },
  { top: '40%', left: '92%', rotate: 12, delay: 0.9 },
  { top: '58%', left: '6%', rotate: -22, delay: 1.4 },
  { top: '64%', left: '88%', rotate: 16, delay: 0.7 },
  { top: '78%', left: '18%', rotate: -12, delay: 1.2 },
  { top: '86%', left: '74%', rotate: 8, delay: 0.5 }
];

const NotFoundPage = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 18, mass: 0.4 });

  const parallaxSoftX = useTransform(smoothX, (v) => v * 0.35);
  const parallaxSoftY = useTransform(smoothY, (v) => v * 0.35);
  const parallaxStrongX = useTransform(smoothX, (v) => v * 0.7);
  const parallaxStrongY = useTransform(smoothY, (v) => v * 0.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate('/', { replace: true });
    }
  }, [seconds, navigate]);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    pointerX.set((x / rect.width) * 60);
    pointerY.set((y / rect.height) * 60);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progress = seconds / REDIRECT_SECONDS;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="rift-page">
      <div className="rift-sky" />
      <div className="rift-grid" />
      <div className="rift-glow" />

      <div className="rift-stars">
        {STAR_FIELD.map((star, index) => (
          <span
            key={index}
            className="rift-star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      <div className="rift-shards">
        {SHARD_FIELD.map((shard, index) => (
          <span
            key={index}
            className="rift-shard"
            style={{
              top: shard.top,
              left: shard.left,
              '--rotation': `${shard.rotate}deg`,
              animationDelay: `${shard.delay}s`
            }}
          />
        ))}
      </div>

      <div className="rift-content">
        <div
          className="rift-portal-zone"
          onPointerMove={reduceMotion ? undefined : handlePointerMove}
          onPointerLeave={reduceMotion ? undefined : handlePointerLeave}
        >
          <motion.div
            className="rift-portal"
            style={{
              x: reduceMotion ? 0 : parallaxSoftX,
              y: reduceMotion ? 0 : parallaxSoftY
            }}
          >
            <motion.div
              className="rift-ring rift-ring-outer"
              animate={reduceMotion ? { opacity: 0.8 } : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="rift-ring rift-ring-mid"
              animate={reduceMotion ? { opacity: 0.85 } : { rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="rift-ring rift-ring-inner"
              animate={reduceMotion ? { opacity: 0.9 } : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <div className="rift-rays" />
            <motion.div
              className="rift-core"
              style={{
                x: reduceMotion ? 0 : parallaxStrongX,
                y: reduceMotion ? 0 : parallaxStrongY
              }}
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      boxShadow: [
                        '0 0 18px rgba(34,211,238,0.2)',
                        '0 0 45px rgba(59,130,246,0.35)',
                        '0 0 18px rgba(34,211,238,0.2)'
                      ]
                    }
              }
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="rift-core-inner"
                animate={
                  reduceMotion
                    ? { y: 0 }
                    : {
                        y: [0, -12, 0],
                        rotate: [0, 6, -6, 0]
                      }
                }
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <BookOpen className="rift-icon" />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="rift-badge">
            <Sparkles className="h-4 w-4" />
            Quantum Shelf Locked
          </div>
        </div>

        <div className="rift-copy">
          <span className="rift-label">Lost Chapter</span>
          <h1 className="rift-glitch" data-text="404">
            404
          </h1>
          <p className="rift-text">
            The page folded into a shimmering rift. We are re-threading the story arc and
            pulling you back to the landing deck.
          </p>

          <div className="rift-actions">
            <Link to="/" className="rift-btn rift-btn-primary">
              <Home className="h-4 w-4" />
              Return to Landing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button type="button" className="rift-btn rift-btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>

          <div className="rift-timer">
            <div className="rift-countdown">
              <svg className="rift-timer-ring" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(15,23,42,0.18)"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(14,165,233,0.85)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  animate={reduceMotion ? {} : { strokeDashoffset: dashOffset }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </svg>
              <span className="rift-countdown-value">{seconds}</span>
            </div>
            <p>
              Auto-redirecting in <span>{seconds} seconds</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
