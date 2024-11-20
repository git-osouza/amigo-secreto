import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  secretFriendId: number | null;
}
