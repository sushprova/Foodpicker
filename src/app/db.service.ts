import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Place } from './models';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private usersFavorites$: any;

  constructor(private db: Firestore, private authService: AuthService) { }

  updateFavorites(newFavorites: Place[]) {
		let user = this.authService.getUserEmail();
		if (!user)
			return;
		const userRef = doc(this.db, 'users', user);

		// Set the favorites array to the newFavorites. If the user document doesn't exist, it will be created.
		// If you only want to update existing documents, you would use updateDoc instead.
		return setDoc(userRef, { favorites: newFavorites }, { merge: true });
	}

	getUserFavorite() {
		let user = this.authService.getUserEmail();
		if (!user)
			return null;

		this.usersFavorites$ = this.getUsersFavorites(user);
		return this.usersFavorites$;
	}

	getUsersFavorites(email: string): Observable<Place[]> {
		const userDocRef: DocumentReference = doc(this.db, 'users', email);
		// Assuming each user document has a 'favorites' field that is an array of favorite places
		return docData(userDocRef).pipe(map(doc => (doc as any)?.favorites as Place[] || []));
}
}
