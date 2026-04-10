import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header/header';
import { Footer } from './core/layout/footer/footer';
import { WhatsappFloat } from './shared/components/whatsapp-float/whatsapp-float';
import { CallFloat } from './shared/components/call-float/call-float';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, WhatsappFloat, CallFloat],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
