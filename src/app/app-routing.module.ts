import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeComponent } from './pages/forms/type/type.component';
import { TypeMediaComponent } from './pages/forms/type-media/type-media.component'
import { PersonComponent } from './pages/forms/person/person.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'form/type-person', component: TypeComponent},
  { path: 'form/type-media', component: TypeMediaComponent},
  { path: 'form/person', component: PersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
