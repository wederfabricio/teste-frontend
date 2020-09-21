<template>
  <div>
      <header>
          <div class='bg-1'>
            Logotipo        
          </div>
          <div class='bg-2'>
            {{ title }}      
          </div>
      </header>
  </div>
</template>

<script>
export default {
    name: 'App',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
    .bg-1 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00e2a5;
        height: 60px;
        color: #777;
    }

    .bg-2 {
        padding: 12px 15px;
        background-color: #565d70;
        color: white;
        height: 40px;
        font-size: 0.7em;
    }
</style>