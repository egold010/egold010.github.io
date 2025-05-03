import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  papers = [
    {
      title: 'VGGT-SLAM: Purely Vision Based SLAM',
      link: 'VGGT-SLAM',
      date: 'May 2025',
    },
    {
      title: 'Evaluating π0 on Long-horizon Manipulation Tasks',
      link: 'EvaluatingPi0',
      date: 'March 2025',
    },
    {
      title: 'Context Aware GAN Image Compression',
      link: 'ImageCompression',
      date: 'March 2025',
    },
    {
      title: 'Synthetic Depth and Semantic Dataset Generation from Minecraft',
      link: 'MCData',
      date: 'November 2024',
    },
    {
      title: 'Deep RL Models with Raw Pixel Data',
      link: 'RawPixelRL',
      date: 'November 2024',
    },
  ]

}
