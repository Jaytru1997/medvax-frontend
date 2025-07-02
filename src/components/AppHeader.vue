<template>
  <header class="bg-brightBlue-900 text-dark p-4 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">MedVax</h1>
      <nav>
        <router-link to="/" class="mr-4 hover:underline">Home</router-link>
        <router-link to="/blog" class="mr-4 hover:underline">Blog</router-link>
        <router-link to="/dashboard" class="hover:underline"
          >Dashboard</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup></script>
