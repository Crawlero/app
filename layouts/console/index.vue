<template>
  <NuxtLoadingIndicator />
  <div class="hidden md:block">
    <Toaster />
    <Navbar />

    <div class="border-t">
      <div class="bg-background">
        <div class="grid lg:grid-cols-5">
          <Sidebar class="hidden lg:block" />

          <div class="col-span-3 lg:col-span-4 lg:border-l">
            <div class="h-full px-4 py-6 lg:px-8">
              <NuxtPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
