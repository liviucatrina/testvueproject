<template>
  <div id="app">
    <div class="d-flex justify-content-center">
      <router-link to="/componenta" custom v-slot="{ navigate }">
        <button type="button" @click="navigate" class="btn btn-secondary m-1">Comp A</button>
      </router-link>
      <router-link to="/componentb" custom v-slot="{ navigate }">
        <button type="button" @click="navigate" class="btn btn-secondary m-1">Comp B</button>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
html, body{
  height: 100%;
}

#app{
  height: 100%;
}
</style>
