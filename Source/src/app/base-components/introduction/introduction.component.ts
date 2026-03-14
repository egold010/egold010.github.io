import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  @ViewChild('terminalInput') terminalInput!: ElementRef;
  @ViewChild('consoleBody') consoleBody!: ElementRef;

  phrases: string[] = [
    "Robotics & Machine Learning Engineer",
    "Autonomous Systems Enthusiast",
    "Full-Stack Developer",
    "Lifelong Learner"
  ];
  currentPhrase: string = "";
  phraseIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;

  mouseX: number = 0;
  mouseY: number = 0;

  // Interactive Terminal State
  terminalHistory: { text: string, type: string }[] = [];
  
  constructor() { }

  ngOnInit(): void {
    // Delay start slightly to let animations finish
    setTimeout(() => this.typeEffect(), 1000);
    setTimeout(() => {
      this.terminalHistory.push({ text: 'Type "help" to see available commands.', type: 'info' });
    }, 2000);
  }

  focusTerminal() {
    if (this.terminalInput) {
      this.terminalInput.nativeElement.focus();
    }
  }

  processCommand(event: any) {
    const cmd = event.target.value.trim();
    event.target.value = '';
    
    if (!cmd) return;
    
    this.terminalHistory.push({ text: cmd, type: 'input' });
    
    const lowerCmd = cmd.toLowerCase();
    
    setTimeout(() => {
      if (lowerCmd === 'help') {
        this.terminalHistory.push({ text: 'Available commands: whoami, skills, projects, contact, clear, sudo', type: 'info' });
      } else if (lowerCmd === 'whoami') {
        this.terminalHistory.push({ text: 'Evan Goldman. Robotics & ML Engineer building autonomous systems.', type: 'success' });
      } else if (lowerCmd === 'skills') {
        this.terminalHistory.push({ text: '> Python, C++, ROS, PyTorch, Angular, SLAM, Embedded Systems', type: 'success' });
      } else if (lowerCmd === 'clear') {
        this.terminalHistory = [];
      } else if (lowerCmd.startsWith('sudo')) {
        this.terminalHistory.push({ text: 'evan is not in the sudoers file. This incident will be reported.', type: 'error' });
      } else if (lowerCmd === 'contact') {
        this.terminalHistory.push({ text: 'Email: evangoldman10@gmail.com', type: 'success' });
      } else if (lowerCmd === 'projects') {
        this.terminalHistory.push({ text: 'Scroll down to view my projects.', type: 'info' });
      } else {
        this.terminalHistory.push({ text: `zsh: command not found: ${cmd}`, type: 'error' });
      }
      this.scrollToBottom();
    }, 150);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.consoleBody) {
        this.consoleBody.nativeElement.scrollTop = this.consoleBody.nativeElement.scrollHeight;
      }
    }, 10);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // range -10 to 10
    const y = (e.clientY / window.innerHeight - 0.5) * 20; // range -10 to 10
    this.mouseX = x;
    this.mouseY = y;
  }

  typeEffect() {
    const currentFullPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.currentPhrase = currentFullPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentPhrase = currentFullPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = 80; // Default typing speed
    if (this.isDeleting) {
      typeSpeed = 40; // Deleting is faster
    }

    if (!this.isDeleting && this.charIndex === currentFullPhrase.length) {
      // Pause at end of word
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      // Move to next word
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.typeEffect(), typeSpeed);
  }

}
