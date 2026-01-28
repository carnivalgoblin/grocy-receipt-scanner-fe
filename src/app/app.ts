import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {GrocyProduct, ScannedItem, ScanService} from './services/scan-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule, MatButtonModule, MatTableModule, MatInputModule,
    MatSelectModule, MatIconModule, MatProgressBarModule, MatSnackBarModule
  ],
  templateUrl: './app.html',   // <--- Deine Datei heißt app.html
  styleUrl: './app.scss'       // <--- Deine Datei heißt app.scss
})
export class App implements OnInit { // <--- Klasse heißt App

  products: GrocyProduct[] = [];
  dataSource: ScannedItem[] = [];
  detectedShop: string = '';
  displayedColumns: string[] = ['name', 'match', 'amount', 'price'];
  isLoading = false;

  constructor(private scanService: ScanService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.scanService.getProducts().subscribe({
      next: (data) => {
        this.products = data.sort((a, b) => a.name.localeCompare(b.name, 'de'));
      },
      error: () => this.showMsg('Konnte Grocy Produkte nicht laden!', 'Fehler')
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.dataSource = [];
      console.log('Frontend: Sende Datei an Backend...'); // LOG 1

      this.scanService.uploadBon(file).subscribe({
        next: (response: any) => { // Wir nennen es 'response' statt 'items'

          // 1. Laden Name holen
          this.detectedShop = response.shop;

          // 2. Die Items stecken jetzt in response.items
          const items = response.items;
          items.forEach((item: any) => {
            if (!item.grocyId) item.grocyId = 'ignore';
          });

          console.log('Frontend: Daten empfangen!', items); // LOG 2
          this.dataSource = items;
          this.isLoading = false;

          this.cdr.detectChanges();

          if (items.length === 0) this.showMsg('Keine Produkte erkannt.', 'Info');
        },
        error: (err) => {
          console.error('Frontend: FEHLER beim Empfang!', err); // LOG 3
          this.isLoading = false; // Ladebalken auch bei Fehler ausmachen!

          this.cdr.detectChanges();
          this.showMsg('Fehler beim Upload.', 'Fehler');
        }
      });
    }
  }

  submit() {
    // Optional: Erst filtern, damit wir keinen Müll senden
    const validItems = this.dataSource.filter(i => i.grocyId && i.grocyId !== 'ignore');

    if (validItems.length === 0) {
      this.showMsg('Nichts zum Buchen ausgewählt.', 'Info');
      return;
    }

    this.isLoading = true;

    // HIER IST DIE ÄNDERUNG:
    // Wir übergeben 'validItems' UND 'this.detectedShop'
    this.scanService.submitBooking(validItems, this.detectedShop).subscribe({
      next: (msg) => {
        this.showMsg('Erfolgreich gebucht!', 'Erfolg');
        this.dataSource = [];
        this.detectedShop = ''; // Reset nach dem Buchen
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.showMsg('Fehler beim Buchen.', 'Fehler');
        this.isLoading = false;
      }
    });
  }

  showMsg(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
