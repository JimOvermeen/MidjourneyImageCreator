import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MidjourneyService } from './services/midjourney.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MidjourneyImageCreator';
  prompt: string = '';
  taskId: string = '';
  generatedImageUrl1: string = '';
  generatedImageUrl2: string = '';
  generatedImageUrl3: string = '';
  percentage: number = 0;

  constructor(private midjourneyService: MidjourneyService) {}

  onSubmit() {
    this.midjourneyService.generateImage(this.prompt).subscribe({
      next: (response) => {
        this.taskId = response.taskId;
        this.fetchGeneratedImage();
      },
      error: (error) => {
        console.error(error.error.message);
      },
    });
  }

  fetchGeneratedImage() {
    this.midjourneyService.getImage(this.taskId).subscribe({
      next: (imageResponse) => {
        if (
          imageResponse.percentage === 100 &&
          imageResponse.status === 'Finished'
        ) {
          this.generatedImageUrl1 = imageResponse.u1Url;
          this.generatedImageUrl2 = imageResponse.u2Url;
          this.generatedImageUrl3 = imageResponse.u3Url;
        } else {
          this.percentage = imageResponse.percentage;
          setTimeout(() => this.fetchGeneratedImage(), 5000);
        }
      },
      error: (error) => {
        console.error('Error fetching generated image:', error);
        // You can add user-friendly error handling here
      },
    });
  }
}
