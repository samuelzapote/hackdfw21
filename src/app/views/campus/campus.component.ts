import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Student {
  name: string;
  x: number;
  y: number;
  hexColor: string;
  emotion: string;
  statusHeu?: string;
};

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {
  public school: Student[] = [];
  public subscription: Subscription = new Subscription;
  public emotions = [
    'slightly_frowning_face',
    'smiley',
    'smiley',
    'smiley',
    'confused',
    'slightly_smiling_face',
    'slightly_smiling_face',
    'slightly_smiling_face',
    'slightly_smiling_face',
    'thinking_face',
  ];
  public colors: string[] = [
    '#CDCAF3',
    '#76B7EB',
    '#E0A035',
    '#F5E568',
    '#F5C2C3',
  ];
  public backgroundHexValue = 'white';

  dragPosition = {x: 0, y: 0};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let headers = new HttpHeaders();
    headers = headers.set('X-Api-Key', environment.randommerKey);
    this.subscription.add(
      this.http.get<string[]>('https://randommer.io/api/Name?nameType=firstname&quantity=30', { headers }).subscribe(res => this.handleGeneratedStudents(res))
    );

    this.initEmotionSimulation();
  }

  private initEmotionSimulation() {
    setTimeout(() => {
      if (this.school && this.school.length) {
        this.school = this.school.map(student => {
          return { ...student, emotion: ['smiley', 'slightly_smiling_face', 'thinking_face'][Math.floor(Math.random() * (2 - 0 + 1) + 0)], statusHeu: 'grey'};
        });
        for (let i = 0; i < 5; i++) {
          const selectedStudent = Math.floor(Math.random() * (this.school.length - 0 + 1) + 0);
          if (this.school[selectedStudent] && this.school[selectedStudent].emotion) {
            this.school[selectedStudent].emotion = this.emotions[Math.floor(Math.random() * (9 - 0 + 1) + 0)];
            if (this.school[selectedStudent].emotion === 'slightly_frowning_face') {
              this.school[selectedStudent] = { ...this.school[selectedStudent], statusHeu: '#ff0000' };
            } else if (this.school[selectedStudent].emotion === 'confused') {
              this.school[selectedStudent] = { ...this.school[selectedStudent], statusHeu: '#E0A035' };
            }
          }
        }
        console.log(this.school);
      }
      // this.initEmotionSimulation();
    }, 10000);
  }

  private handleGeneratedStudents(school: string[]): void {
    let y = 200;
    let x = 80;
    school.forEach((studentName, i) => {
      let newStudent: Student = {
        name: studentName,
        x,
        y,
        hexColor: this.colors[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
        emotion: this.emotions[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
      };

      if (newStudent.emotion === 'slightly_frowning_face') {
        newStudent = { ...newStudent, statusHeu: '#ff0000' };
      } else if (newStudent.emotion === 'confused') {
        newStudent = { ...newStudent, statusHeu: '#E0A035' };
      }

      this.school.push(newStudent);

      x += 180;
      y -= 142;

      if ((i + 1) % 6 === 0) {
        x = 80;
        y += 200;
      }
    })
  }

  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }

  public changeBackgroundColor(hex: string): void {
    this.backgroundHexValue = hex;
  }

}
