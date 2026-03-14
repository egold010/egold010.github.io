import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  template: `
    <div class="loading-screen" *ngIf="isLoading" [class.fade-out]="isFadingOut">
      <div class="loading-container">
        <!-- Logo/Brand -->
        <div class="brand-section">
          <div class="logo-container">
            <div class="logo-pulse"></div>
            <div class="logo-text">
              <span class="letter" *ngFor="let letter of 'EVAN'.split(''); let i = index"
                    [style.animation-delay]="i * 0.1 + 's'">
                {{ letter }}
              </span>
            </div>
          </div>
          <div class="tagline">
            <span class="tagline-text">Robotics Engineer</span>
          </div>
        </div>

        <!-- Loading Animation -->
        <div class="loading-animation">
          <div class="loading-bar">
            <div class="loading-progress" [style.width.%]="progress"></div>
          </div>
          <div class="loading-text">
            <span class="loading-message">{{ currentMessage }}</span>
            <div class="loading-dots">
              <span class="dot" *ngFor="let dot of [1,2,3]" [style.animation-delay]="dot * 0.2 + 's'"></span>
            </div>
          </div>
        </div>

        <!-- Loading Tips -->
        <div class="tips-section">
          <div class="tip-text">{{ currentTip }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
    }

    .fade-out {
      opacity: 0;
      visibility: hidden;
    }

    .loading-container {
      text-align: center;
      max-width: 400px;
      width: 100%;
      padding: 2rem;
    }

    .brand-section {
      margin-bottom: 3rem;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .logo-pulse {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #0ea5e9, #0284c7);
      border-radius: 50%;
      margin-right: 1rem;
      animation: pulse-logo 2s ease-in-out infinite;
    }

    @keyframes pulse-logo {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    .logo-text {
      display: flex;
      font-size: 2.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #0ea5e9, #0284c7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .letter {
      display: inline-block;
      animation: letter-appear 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes letter-appear {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tagline {
      margin-top: 0.5rem;
    }

    .tagline-text {
      color: #94a3b8;
      font-size: 1.1rem;
      font-weight: 500;
      animation: fade-in 1s ease-out 0.5s both;
    }

    .loading-animation {
      margin-bottom: 2rem;
    }

    .loading-bar {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .loading-progress {
      height: 100%;
      background: linear-gradient(90deg, #0ea5e9, #0284c7);
      border-radius: 2px;
      transition: width 0.3s ease;
      position: relative;
    }

    .loading-progress::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .loading-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }

    .loading-message {
      animation: fade-in 0.5s ease-out;
    }

    .loading-dots {
      display: flex;
      gap: 2px;
    }

    .dot {
      width: 4px;
      height: 4px;
      background: #0ea5e9;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite both;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .tips-section {
      margin-top: 2rem;
    }

    .tip-text {
      color: #64748b;
      font-size: 0.9rem;
      font-style: italic;
      animation: fade-in 1s ease-out 1s both;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Mobile responsiveness */
    @media (max-width: 480px) {
      .logo-text {
        font-size: 2rem;
      }

      .loading-container {
        padding: 1rem;
      }
    }
  `]
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  isLoading = true;
  isFadingOut = false;
  progress = 0;
  private progressInterval: any;
  private messageInterval: any;

  currentMessage = 'Initializing';
  currentTip = '💡 Pro tip: Use the floating action button for quick navigation';

  private messages = [
    'Initializing',
    'Loading components',
    'Setting up animations',
    'Preparing content',
    'Almost ready'
  ];

  private tips = [
    '💡 Pro tip: Use the floating action button for quick navigation',
    '🚀 Fun fact: This site features 50+ interactive animations',
    '🎯 Evan has worked with Tesla, NVIDIA, and Boston Dynamics',
    '📚 Evan\'s research has been published in top robotics conferences',
    '⚡ The site loads in under 3 seconds with optimized performance'
  ];

  constructor() {}

  ngOnInit() {
    this.startLoading();
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
  }

  private startLoading() {
    let messageIndex = 0;
    let tipIndex = 0;

    // Progress animation
    this.progressInterval = setInterval(() => {
      this.progress += Math.random() * 15 + 5;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.progressInterval);

        // Start fade out
        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => {
            this.isLoading = false;
          }, 800);
        }, 500);
      }
    }, 200);

    // Message cycling
    this.messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % this.messages.length;
      this.currentMessage = this.messages[messageIndex];

      // Change tip occasionally
      if (Math.random() > 0.7) {
        tipIndex = (tipIndex + 1) % this.tips.length;
        this.currentTip = this.tips[tipIndex];
      }
    }, 800);
  }
}