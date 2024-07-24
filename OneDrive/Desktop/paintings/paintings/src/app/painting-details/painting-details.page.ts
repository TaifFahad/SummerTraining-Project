// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MetApiService } from '../services/met-api.service';
// import { CommentService } from '../services/comment.service';

// @Component({
//   selector: 'app-painting-details',
//   templateUrl: './painting-details.page.html',
//   styleUrls: ['./painting-details.page.scss'],
// })
// export class PaintingDetailsPage implements OnInit {
//   painting: any;
//   username: string = '';
//   newComment: string = '';
//   comments: any[] = [];
//   showComments: boolean = false;
//   commentCount: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private metApiService: MetApiService,
//     private commentService: CommentService
//   ) {}

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.metApiService.getPaintingDetails(+id).subscribe(details => {
//         this.painting = details;
//         if (typeof this.painting.likes !== 'number') {
//           this.painting.likes = 0; // Initialize likes if not a number
//         }
//         this.loadComments(id); // Load comments for the painting
//       });
//     }
//   }

//   loadComments(itemId: string) {
//     this.commentService.getComments(itemId).subscribe(comments => {
//       if (comments && Array.isArray(comments)) {
//         this.comments = comments;
//         this.commentCount = this.comments.length;
//       } else {
//         this.comments = [];
//         this.commentCount = 0;
//       }
//     }, error => {
//       console.error('Error loading comments:', error);
//     });
//   }

//   addComment() {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id && this.username.trim() && this.newComment.trim() && this.painting && this.painting.objectID) {
//       const commentData = { username: this.username, comment: this.newComment };
//       this.commentService.addComment(this.painting.objectID, commentData)
//         .subscribe(() => {
//           this.loadComments(id); // Refresh comments after adding a new one
//           this.username = ''; // Clear the username field
//           this.newComment = ''; // Clear the comment field
//         }, (error) => {
//           console.error('Error adding comment:', error);
//         });
//     } else {
//       console.warn('Username or comment is missing');
//     }
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

//   toggleComments() {
//     this.showComments = !this.showComments;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetApiService } from '../services/met-api.service';
import { CommentService } from '../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.page.html',
  styleUrls: ['./painting-details.page.scss'],
})
export class PaintingDetailsPage implements OnInit {
  painting: any;
  commentForm: FormGroup;
  comments: any[] = [];
  showComments: boolean = false;
  commentCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private metApiService: MetApiService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z ]+$')]],
      newComment: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z ]+$')]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.metApiService.getPaintingDetails(+id).subscribe(details => {
        this.painting = details;
        if (typeof this.painting.likes !== 'number') {
          this.painting.likes = 0; // Initialize likes if not a number
        }
        this.loadComments(id); // Load comments for the painting
      });
    }
  }

  loadComments(itemId: string) {
    this.commentService.getComments(itemId).subscribe(comments => {
      if (comments && Array.isArray(comments)) {
        this.comments = comments;
        this.commentCount = this.comments.length;
      } else {
        this.comments = [];
        this.commentCount = 0;
      }
    }, error => {
      console.error('Error loading comments:', error);
    });
  }

  addComment() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.commentForm.valid && this.painting && this.painting.objectID) {
      const commentData = { 
        username: this.commentForm.get('username')?.value, 
        comment: this.commentForm.get('newComment')?.value,
        // Note: The API should handle the date, but this is here for completeness
        date: new Date().toISOString(),
      };
      this.commentService.addComment(this.painting.objectID, commentData)
        .subscribe(() => {
          this.loadComments(id); // Refresh comments after adding a new one
          this.commentForm.reset(); // Reset the form
        }, (error) => {
          console.error('Error adding comment:', error);
        });
    } else {
      console.warn('Form is invalid or painting objectID is missing');
    }
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
    } catch (error) {
      console.error('Failed to update liked paintings in local storage:', error);
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
