import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-profile',
  imports: [RouterLinkActive, RouterLink, RouterOutlet, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent { }
