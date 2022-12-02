const { createApp } = Vue;

createApp({
  data() {
    return {
      deleteElement: null,
      tryToFilter: null,
      savedIndex: 0,
      newMessageChat: '',
      newMessage: {},
      recentChatsList: [{
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Hai portato a spasso il cane?',
          status: 'sent',
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Ricordati di dargli da mangiare',
          status: 'sent'
        },
        {
          date: '10/01/2020 16:15:22',
          message: 'Tutto fatto!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [{
          date: '20/03/2020 16:30:00',
          message: 'Ciao come stai?',
          status: 'sent'
        },
        {
          date: '20/03/2020 16:30:55',
          message: 'Bene grazie! Stasera ci vediamo?',
          status: 'received'
        },
        {
          date: '20/03/2020 16:35:00',
          message: 'Mi piacerebbe ma devo andare a fare la spesa.',
          status: 'received'
        }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [{
          date: '28/03/2020 10:10:40',
          message: 'La Marianna va in campagna',
          status: 'received'
        },
        {
          date: '28/03/2020 10:20:10',
          message: 'Sicuro di non aver sbagliato chat?',
          status: 'sent'
        },
        {
          date: '28/03/2020 16:15:22',
          message: 'Ah scusa!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Lo sai che ha aperto una nuova pizzeria?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Si, ma preferirei andare al cinema',
          status: 'received'
        }
        ],
      },
      {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [],
      },
      {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [],
        lastAccess: '12"00',
      },
      {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [],
      },
      {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [],
      }
      ],

    }
  },
  methods: {
    getLastMessageByIndex(conversationIndex) {
      const conversation = this.recentChatsList[conversationIndex];
      const message = conversation.messages[conversation.messages.length - 1];
      return {
        message: message.message,
        date: message.date
      };
    },
    saveIndex(i) {
      this.savedIndex = i;

    },
    addMessage() {
      let clock = new Date;
      let hours = clock.getHours();
      let minutes = (clock.getMinutes()).toString();
      if (minutes.length === 2) {
        newClock = `${hours}:${minutes}`
      } else {
        minutes = "0" + minutes;
        newClock = `${hours}:${minutes}`
      }
      this.createMessage(true);
      this.newMessageChat = '';
      setTimeout(this.answer, 1000)


    },
    answer() {
      this.createMessage(false)

    },


    createMessage(sent) {
      this.newMessage.date = newClock;
      if (sent === true) {
        this.newMessage.message = this.newMessageChat;
        this.newMessage.status = 'sent';
      } else {
        this.newMessage.message = 'ok';
        this.newMessage.status = 'received';

      }
      this.recentChatsList[this.savedIndex].messages.push({
        date: this.newMessage.date,
        message: this.newMessage.message,
        status: this.newMessage.status
      })
    },
    deleteMessage(i) {

      this.recentChatsList[this.savedIndex].messages.splice(i, 1)
    },


    filterArray() {
      if (this.tryToFilter) {
        return this.recentChatsList.filter((item) => {
          const convert = item.name.toLowerCase()
          return convert.includes(this.tryToFilter.toLowerCase());
        })
      } else {
        return this.recentChatsList;
      }

    },
  },
  mounted() {
    for (item in this.recentChatsList) {
      for (let i = 0; i < this.recentChatsList[item].messages.length; i++) {
        let dateConverted = this.recentChatsList[item].messages[i].date;
        dateConverted = dateConverted.split("");
        dateConverted = dateConverted.slice(10, -3);
        dateConverted = dateConverted.join("");

        this.recentChatsList[item].messages[i].date = dateConverted

      }
    }
  }
}).mount("#app")



