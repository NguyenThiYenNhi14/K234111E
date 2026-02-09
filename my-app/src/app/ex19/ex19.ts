import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ex19',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ex19.html',
  styleUrl: './ex19.css',
})
export class Ex19 {
  title = 'Exercise 19: Configuration Routing';
}