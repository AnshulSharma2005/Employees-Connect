import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  token!: string;

  @Column()
  channel!: string;

  @Column()
  text!: string;

  @Column()
  time!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
