import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liked-paintings',
  templateUrl: './liked-paintings.page.html',
  styleUrls: ['./liked-paintings.page.scss'],
})
export class LikedPaintingsPage implements OnInit {
  likedPaintings: any[] = [];
  loading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial load when the component is initialized
    this.loadLikedPaintings();
  }

  ionViewWillEnter() {
    this.loadLikedPaintings();
  }

  loadLikedPaintings() {
    try {
      const storedPaintings = localStorage.getItem('likedPaintings');
      this.likedPaintings = storedPaintings ? JSON.parse(storedPaintings) : [];
      console.log('Loaded liked paintings from local storage:', this.likedPaintings);
    } catch (error) {
      console.error('Failed to load liked paintings from local storage:', error);
      this.likedPaintings = [];
    } finally {
      this.loading = false;
    }
  }

  removeLike(painting: any) {
    try {
      painting.liked = false;
      let likedPaintings = JSON.parse(localStorage.getItem('likedPaintings') ?? '[]');
      likedPaintings = likedPaintings.filter((likedPainting: any) => likedPainting.objectID !== painting.objectID);
      console.log('Saving liked paintings to local storage after removal:', likedPaintings);
      localStorage.setItem('likedPaintings', JSON.stringify(likedPaintings));
      this.loadLikedPaintings(); // Refresh the list after removing
    } catch (error) {
      console.error('Failed to update liked paintings in local storage:', error);
    }
  }

  viewDetails(painting: any) {
    this.router.navigate(['/painting-details', painting.objectID]);
  }
}
