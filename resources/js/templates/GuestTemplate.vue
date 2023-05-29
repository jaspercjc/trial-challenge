<template>
    <div class="w-screen h-screen md:bg-gray-200 flex justify-center items-center">
        <router-view v-slot=" { Component } ">
            <transition name=" fade" mode="out-in">
                <component :is=" Component " />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
</script>