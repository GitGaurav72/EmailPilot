import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications = [
    "New message from John",
    "Your order has been shipped",
    "Reminder: Meeting at 3 PM",
    "You have 3 new followers",
    "Password change successful",
    "New comment on your post",
    "Your subscription is expiring soon",
    "New like on your photo",
    "You have a new connection request",
    "System update available",
    "Your payment was successful",
    "New event: Angular Workshop",
    "Your post has been shared",
    "New review on your product",
    "You have a new friend request"
  ];

  constructor(public notificationService: NotificationService) {}
}
