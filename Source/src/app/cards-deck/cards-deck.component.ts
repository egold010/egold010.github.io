import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from '../details';

@Component({
  selector: 'app-cards-deck',
  templateUrl: './cards-deck.component.html',
  styleUrls: ['./cards-deck.component.css']
})
export class CardsDeckComponent implements OnInit {

  @Input() set Cards(items: CardItem[]) {
    this.cardItems = items
  }

  Math = Math

  cardItems: CardItem[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
