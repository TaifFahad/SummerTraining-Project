// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MetApiService } from '../services/met-api.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage implements OnInit {
//   paintings: any[] = [];
//   loading: boolean = true;
//   progress: number = 0; // Define the progress property

//   constructor(
//     private metApiService: MetApiService, 
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.metApiService.searchPaintings('painting').subscribe((response: any) => {
//       if (response.objectIDs) {
//         let totalObjects = response.objectIDs.slice(0, 20).length;
//         let fetchedObjects = 0;
//         response.objectIDs.slice(0, 20).forEach((objectID: number) => {
//           this.metApiService.getPaintingDetails(objectID).subscribe((details: any) => {
//             fetchedObjects++;
//             if (details.primaryImage !== "") {
//               details.liked = this.isLiked(details);
//               details.likes = 0;
//               this.paintings.push(details);
//             }
//             this.updateProgress(fetchedObjects, totalObjects);
//             if (fetchedObjects === totalObjects) {
//               this.loading = false;
//             }
//           }, error => {
//             fetchedObjects++;
//             this.updateProgress(fetchedObjects, totalObjects);
//             if (fetchedObjects === totalObjects) {
//               this.loading = false;
//             }
//           });
//         });
//       } else {
//         this.loading = false;
//       }
//     }, error => {
//       console.error('Error searching paintings:', error);
//       this.loading = false;
//     });
//   }

//   isLiked(painting: any): boolean {
//     const likedPaintings = JSON.parse(localStorage.getItem('likedPaintings') ?? '[]');
//     return likedPaintings.some((likedPainting: any) => likedPainting.objectID === painting.objectID);
//   }

//   viewDetails(painting: any) {
//     this.router.navigate(['/painting-details', painting.objectID]);
//   }

//   toggleLike(painting: any, event: Event) {
//     event.stopPropagation();
//     painting.liked = !painting.liked;
//     this.updateLocalStorage(painting);
//   }

//   updateLocalStorage(painting: any) {
//     try {
//       let likedPaintings = JSON.parse(localStorage.getItem('likedPaintings') ?? '[]');
//       if (painting.liked) {
//         likedPaintings.push(painting);
//       } else {
//         likedPaintings = likedPaintings.filter((likedPainting: any) => likedPainting.objectID !== painting.objectID);
//       }
//       localStorage.setItem('likedPaintings', JSON.stringify(likedPaintings));
//     } catch (error) {
//       console.error('Failed to update liked paintings in local storage:', error);
//     }
//   }

//   updateProgress(fetched: number, total: number) {
//     this.progress = total > 0 ? fetched / total : 0;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetApiService } from '../services/met-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  paintings: any[] = [];
  loading: boolean = true;
  progress: number = 0;

  constructor(
    private metApiService: MetApiService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPaintings();
  }

  loadPaintings() {
    this.metApiService.searchPaintings('painting').subscribe((response: any) => {
      if (response.objectIDs) {
        let totalObjects = response.objectIDs.slice(0, 20).length;
        let fetchedObjects = 0;
        response.objectIDs.slice(0, 20).forEach((objectID: number) => {
          this.metApiService.getPaintingDetails(objectID).subscribe((details: any) => {
            fetchedObjects++;
            if (details.primaryImage !== "") {
              details.liked = this.isLiked(details);
              details.likes = 0;
              this.paintings.push(details);
            }
            this.updateProgress(fetchedObjects, totalObjects);
            if (fetchedObjects === totalObjects) {
              this.loading = false;
            }
          }, error => {
            fetchedObjects++;
            this.updateProgress(fetchedObjects, totalObjects);
            if (fetchedObjects === totalObjects) {
              this.loading = false;
            }
          });
        });
      } else {
        this.loading = false;
      }
    }, error => {
      console.error('Error searching paintings:', error);
      this.loading = false;
    });
  }

  isLiked(painting: any): boolean {
    const likedPaintings = JSON.parse(localStorage.getItem('likedPaintings') ?? '[]');
    return likedPaintings.some((likedPainting: any) => likedPainting.objectID === painting.objectID);
  }

  viewDetails(painting: any) {
    this.router.navigate(['/painting-details', painting.objectID]);
  }

  toggleLike(painting: any, event: Event) {
    event.stopPropagation();
    painting.liked = !painting.liked;
    this.updateLocalStorage(painting);
  }

  updateLocalStorage(painting: any) {
    try {
      let likedPaintings = JSON.parse(localStorage.getItem('likedPaintings') ?? '[]');
      if (painting.liked) {
        likedPaintings.push(painting);
      } else {
        likedPaintings = likedPaintings.filter((likedPainting: any) => likedPainting.objectID !== painting.objectID);
      }
      localStorage.setItem('likedPaintings', JSON.stringify(likedPaintings));
      this.loadPaintings(); // Refresh the list to ensure synchronization
    } catch (error) {
      console.error('Failed to update liked paintings in local storage:', error);
    }
  }

  updateProgress(fetched: number, total: number) {
    this.progress = total > 0 ? (fetched / total) * 100 : 0; // Update progress to percentage
  }
}
