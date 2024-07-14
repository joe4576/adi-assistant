import { Firestore } from "firebase-admin/firestore";

export class BaseService {
  protected db: Firestore;

  constructor(ctx: { db: Firestore }) {
    this.db = ctx.db;
  }
}
