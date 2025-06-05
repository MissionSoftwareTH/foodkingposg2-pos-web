<script setup lang="ts">
// You can add your logic here
</script>

<template>
    <div class="container mx-auto p-4 flex flex-col">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Example Card -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card 1</h2>
                    <p>This is a basic card.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Action</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card 2</h2>
                    <p>Another card example.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-secondary">Action</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card 3</h2>
                    <p>A third card for your dashboard.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-accent">Action</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>