import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 30,
  })
  name: string

  @Column({
    length: 30,
  })
  genre: string
}
