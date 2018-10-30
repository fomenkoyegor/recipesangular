import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingridient} from '../../interfases/ingridient';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-ingridient',
  templateUrl: './ingridient.component.html',
  styleUrls: ['./ingridient.component.scss']
})
export class IngridientComponent implements OnInit {
  @Input() ingridient: Ingridient;
  @Input() index: number;
  @Output() deleteIng = new EventEmitter();
  isEdit: boolean;
  oldName;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
  }


  delete(id) {
    this.apiService.deleteIngridient(this.ingridient.recipeId, this.ingridient._id).subscribe(
      (message) => {
        console.log(message);
        this.deleteIng.emit(id);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  save() {
    if (this.ingridient.name) {
      this.apiService.updateIngridient(this.ingridient).subscribe(
        (ingridient: Ingridient) => {
          this.ingridient = ingridient;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.isEdit = false;
        }
      );
    }

  }

  onEdit() {
    this.isEdit = true;
    this.oldName = this.ingridient.name;
  }

  onCancel() {
    this.isEdit = false;
    this.ingridient.name = this.oldName;
  }

}
