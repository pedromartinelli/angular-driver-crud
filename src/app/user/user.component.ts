import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UserComponent implements OnInit {
  userDialog: boolean = false;

  users!: User[];

  user!: User;

  selectedUsers!: User[] | null;

  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  openNew() {
    this.user = {} as User;
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir os usuários selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(
          (val) => !this.selectedUsers?.includes(val)
        );
        this.selectedUsers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuários excluídos',
          life: 3000,
        });
      },
    });
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message:
        'Você tem certeza que deseja excluir o usuário ' + user.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.users = this.users.filter((val) => val.id !== user.id);
          this.user = {} as User;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário Excluído',
            life: 3000,
          });
        });
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
    if (this.user.nome?.trim()) {
      if (this.user.id) {
        this.userService.updateUser(this.user).subscribe(
          () => {
            this.reloadUsers();
            this.users[this.findIndexById(this.user.id)] = this.user;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário Atualizado',
              life: 3000,
            });
          },
          (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Falha',
              detail: 'Falha ao atualizar usuário. Por favor, tente novamente.',
              life: 3000,
            });
          }
        );
      } else {
        this.userService.createUser(this.user).subscribe(
          () => {
            this.reloadUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário Cadastrado',
              life: 3000,
            });
          },
          (error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Falha',
              detail: 'Falha ao cadastrar usuário. Por favor, tente novamente.',
              life: 3000,
            });
          }
        );
      }

      this.userDialog = false;
      this.user = {} as User;
    }
  }

  reloadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.updateTable();
    });
  }

  updateTable() {
    this.users = [...this.users];
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
