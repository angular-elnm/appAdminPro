import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
      .subscribe(
        n => console.log("sub ", n),
        error => console.error("Error observer ", error),
        () => console.log("Observer ha terminado")
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

      }, 1000)

    }).pipe(
      map(resp => resp.valor),
      filter((resp, index) => {

        if ((resp % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );

  }

}
