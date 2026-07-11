import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private static readonly RECRUITER_NOTICE_KEY = 'recruiterNoticeDismissed';

  recruiterNoticeDismissed = false;

  constructor() { }

  ngOnInit(): void {
    try {
      this.recruiterNoticeDismissed =
        localStorage.getItem(HomeComponent.RECRUITER_NOTICE_KEY) === 'true';
    } catch {
      // localStorage unavailable (e.g. private mode) — just show the notice.
    }
  }

  dismissRecruiterNotice(): void {
    this.recruiterNoticeDismissed = true;
    try {
      localStorage.setItem(HomeComponent.RECRUITER_NOTICE_KEY, 'true');
    } catch {
      // Non-fatal: dismissal simply won't persist across visits.
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
