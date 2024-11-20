import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './repository/participant.entity';

@Injectable()
export class AmigoSecretoService {

    constructor(@InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    ) { }

    async addParticipant(name: string) {
        try {
            const participant = new Participant();
            participant.name = name.toUpperCase();
            return await this.participantRepository.save(participant);
        } catch (error) {
            throw new HttpException('Já existe um participante com este nome!', HttpStatus.BAD_REQUEST);
        }
        
    }

    async drawFriend(name: string) {
        const participant = await this.participantRepository.findOneBy({ name });

        if (participant == null) {
            throw new HttpException('Seu nome não está cadastrado como participante!', HttpStatus.BAD_REQUEST);
        }

        if (participant.secretFriendId !== null) {
            throw new HttpException('Você já realizou o sorteio!', HttpStatus.BAD_REQUEST);
        }

        const participants = await this.participantRepository.find({
            where: { secretFriendId: null },
        });

        const filteredParticipants = participants.filter(
            p => p.name !== participant.name,
        );

        if (filteredParticipants.length === 0) {
            throw new HttpException('Não há participantes elegíveis para sortear.', HttpStatus.BAD_REQUEST);
        }

        const secretFriend = await this.getFriend(filteredParticipants);

        participant.secretFriendId = secretFriend.id;
        await this.participantRepository.save(participant);

        return {
            participant: participant.name,
            secretFriend: secretFriend.name,
        };
    }

    async getAllParticipants() {
        return this.participantRepository.find();
    }

    async updateAll() {
        const alls = await this.getAllParticipants();
        alls.forEach(item => {
            item.secretFriendId = null;
            this.participantRepository.save(item);
        })
    }

    async removeAll() {
        const alls = await this.getAllParticipants();
        if (alls.length > 0) {
            await this.participantRepository.remove(alls);
        }
    }

    async getFriend(list: Participant[]): Promise<Participant> {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        const secretFriend = list[0];

        const validate = await this.participantRepository.find({
            where: { secretFriendId: secretFriend.id },
        });

        if (validate.length > 0) {
            list.shift();

            if (list.length === 0) {
                throw new HttpException('Todos os participantes já foram sorteados', HttpStatus.BAD_REQUEST);
            }

            return this.getFriend(list);
        }

        return secretFriend;
    }

    async getDrawnList() {
        let list = this.getAllParticipants();
        if(list){
            (await list).forEach(item => {
                item['draw'] = item.secretFriendId !== null;
                item.secretFriendId = null;
            })
        }

        return list;
    }
}
