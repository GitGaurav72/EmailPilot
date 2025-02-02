import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {RouterModule, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [FormsModule, RouterModule, NgFor],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})

export class AnalyticsComponent implements OnInit {
  openRate = 75; // Example data
  clickRate = 45; // Example data
  bounceRate = 5; // Example data
  unsubscribeRate = 2; // Example data

  topRecipients = [
    { email: 'john@example.com', engagement: 90 },
    { email: 'jane@example.com', engagement: 85 },
    { email: 'alex@example.com', engagement: 80 }
  ];

  ngOnInit() {
    this.renderChart();
  }

  renderChart() {
    Chart.register(...registerables);
    const ctx = document.getElementById('emailActivityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Open Rate',
            data: [65, 70, 75, 80, 85, 90],
            borderColor: '#1a73e8',
            fill: false
          },
          {
            label: 'Click Rate',
            data: [40, 45, 50, 55, 60, 65],
            borderColor: '#34a853',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  exportData() {
    console.log('Exporting data...');
    // Add logic to export data (e.g., CSV, PDF)
  }
}