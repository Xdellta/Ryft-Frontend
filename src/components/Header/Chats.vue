<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import axiosInstance from '../../services/axiosInstance'

  import ChatsSelect from './ChatsSelect.vue'
  import SearchBar from '@/components/shared/SearchBar.vue'
  import ChatsItem from './ChatsItem.vue'

  interface Chat {
    chatId: string;
    avatar: string;
    name: string;
    isOnline: boolean;
    lastUnreadMessage: string;
    lastUnreadMessageAuthor: string;
    lastUnreadMessageAuthorId: string;
    unreadMessagesAmount: number;
  }

  const myChats = ref<Chat[]>([]);
  const searchQuery = ref<string>('');

  const filteredChats = computed(() =>
    myChats.value.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  async function getChats() {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID is missing or invalid');
        return;
      }

      const response = await axiosInstance.post('chat/getChats', {
        userId: userId
      });

      myChats.value = response.data;
      
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  }

  onMounted(() => {
    getChats()
  });
</script>

<template>
  <div class="chats">
    <div class="chats-top">
      <h2>Messages</h2>

      <ChatsSelect />
    </div>

    <SearchBar v-model="searchQuery" />

    <ul>
      <ChatsItem v-for="chat in filteredChats" :key="chat.chatId" :chat="chat" />
    </ul>
  </div>
</template>

<style scoped>
  .chats {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .chats-top {
    display: grid;
    grid-template-columns: auto 80px;
    align-items: center;
  }

  .chats-top h2 {
    font-size: 140%;
    font-weight: 500;
  }

  .chats ul {
    width: calc(100% + 60px);
    max-height: calc(100% - 115px);
    margin-left: -30px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .chats ul::-webkit-scrollbar {
    display: none; /* Chrome, Safari i Edge */
  }
</style>