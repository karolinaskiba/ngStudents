import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDoc,
  updateDoc,
  doc,
  getDocs,
  docData,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  collection = collection(this.firestore, 'users');

  getUsers(): Observable<UserInterface[]> {
    return collectionData(this.collection, {
      idField: 'id',
    }) as Observable<UserInterface[]>;
  }
  addStudent(data: UserInterface): Promise<any> {
    return addDoc(this.collection, data);
  }
  getStudent(id: string): Observable<UserInterface> {
    const docInstance = doc(this.firestore, 'users', id);
    const promise = getDoc(docInstance).then((item: any) => {
      return {
        firstName:
          item._document.data.value.mapValue.fields.firstName.stringValue,
        lastName:
          item._document.data.value.mapValue.fields.lastName.stringValue,
        phone: item._document.data.value.mapValue.fields.phone.stringValue,
        email: item._document.data.value.mapValue.fields.email.stringValue,
        school: item._document.data.value.mapValue.fields.school.stringValue,
        parent: item._document.data.value.mapValue.fields.parent.stringValue,
      } as UserInterface;
    });
    return from(promise);
  }
  deleteStudent(id: string): Promise<any> {
    const docInstance = doc(this.firestore, 'users', id);
    return deleteDoc(docInstance);
  }
  updateStudent(data: any, id: string): Promise<any> {
    const docInstance = doc(this.firestore, 'users', id);
    return updateDoc(docInstance, data);
  }
}
