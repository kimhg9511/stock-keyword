<template>
  <div id="todo">
    <h1>Todo List</h1>
      <v-row>
        <v-col cols="9">
        <v-text-field
          v-model="addText"
          label="enter to add"
          class="input-todo__input" 
          placeholder="type text here" 
          @keydown.enter="addTodo(addText)"
        />
        </v-col>
        <v-col cols="3">
        <v-btn color="success" @click="addTodo(addText)">Add</v-btn>
        </v-col>
      </v-row>
    <ul>
      <transition-group name="list" tag="p">
      <li class="todo-item" v-for="(todo, index) in todos" :key="index" @change="isEmpty">
        <v-row>
          <v-col cols="6">
            <p 
              class="text completed" 
              cols="6" 
              v-if="todo.completed"
              key="appear">
              {{todo.text}}
            </p>
            <p 
              class="text" 
              cols="6" 
              v-else
              key="disappear">
              {{todo.text}}
            </p>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click="completeTodo(index)" v-if="!todo.completed">
              Complete
            </v-btn>
            <v-btn color="warning" @click="completeTodo(index)" v-else>
              Restore
            </v-btn>       
          </v-col>
          <v-col cols="3">
            <v-btn color="error" class="delete" @click="deleteTodo(index)">Delete</v-btn>
          </v-col>
        </v-row>
      </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      todos: [
        {
          text: 'test-todo1',
          completed: false
        },
        {
          text: 'test-todo2',
          completed: true
        },
        {
          text: 'test-todo3',
          completed: false
        },
      ],
      addText: "",
    }
  },
  methods: {
    addTodo(addText){
      if (!addText) return;
      const todo = {
        text: addText,
        completed: false
      };
      this.todos.push(todo);
    },
    completeTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    deleteTodo(index){
      this.todos.splice(index,1);
    },
    isEmpty(){
      console.log('change')
      if (!this.todos.length) {
        alert('empty');
      }
    },
  }
}
</script>

<style>
  p.text.completed{
    text-decoration: line-through;
    animation: strike 0.4s linear;
    animation-direction: alternate;
  }
  @keyframes strike {
    from { text-decoration-color: transparent; }
    to { text-decoration-color: auto; }
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.4s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>