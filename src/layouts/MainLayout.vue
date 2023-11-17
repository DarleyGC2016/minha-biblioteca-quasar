<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Menu"
          :to="{name: 'home'}"
        />

        <q-toolbar-title>
          Minha Biblioteca Virtual
        </q-toolbar-title>

        <q-btn flat dense :to="{name: 'newBook'}">
          Novo
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
