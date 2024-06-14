<template>
    <Navbar />
    <div class="about">
      <h1>A propos</h1>
      <div>
        <el-button type="primary" @click="requestNotificationPermission">Activer les notifications</el-button>
        <el-button type="primary" @click="sendNotification" :disabled="!notificationGranted">Envoyer une notification</el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notificationGranted: false
      };
    },
    methods: {
      async requestNotificationPermission() {
        if (!('Notification' in window)) {
          console.error('This browser does not support notifications.');
          return;   
        }
  
        if (Notification.permission === 'granted') {
          this.notificationGranted = true;
        } else if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            this.notificationGranted = true;
          }
        }
      },
      sendNotification() {
        if (this.notificationGranted) {
          new Notification('Notifications activées', {
            body: 'Vous avez activé les notifications!'
          });
        } else {
          console.error('Les notifications ne sont pas activées.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .about {
    padding: 20px;
  }
  </style>
  