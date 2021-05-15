/* eslint-disable no-debugger, no-console */

<template>
  <div class="grid grid-cols-12 sm:gap-10">
    <aside class="col-span-12 sm:col-span-3 lg:col-span-2 border-2 border-gray-800 bg-gray-800">
      <div class="p-2 hidden md:flex items-center justify-center">
        Administration
      </div>

      <nav>
        <NuxtLink to="/admin/news" :class="isActive('news')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <g data-name="message-square">
                <rect width="24" height="24" opacity="0" />
                <circle cx="12" cy="11" r="1" />
                <circle cx="16" cy="11" r="1" />
                <circle cx="8" cy="11" r="1" />
                <path d="M19 3H5a3 3 0 0 0-3 3v15a1 1 0 0 0 .51.87A1 1 0 0 0 3 22a1 1 0 0 0 .51-.14L8 19.14a1 1 0 0 1 .55-.14H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 13a1 1 0 0 1-1 1H8.55a3 3 0 0 0-1.55.43l-3 1.8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z" />
              </g>
            </g>
          </svg>
          <span class="mx-4 font-medium ">News</span>
        </NuxtLink>

        <NuxtLink to="/admin/artists" :class="isActive('artists')">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span class="mx-4 font-medium ">Artists</span>
        </NuxtLink>

        <NuxtLink to="/admin/concerts" :class="isActive('concerts')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="speaker"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" /><path d="M12 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" /><path d="M12 12a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 12zm0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 17z" /><path d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm1 17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" /></g></g></svg>
          <span class="mx-4 font-medium ">Concerts</span>
        </NuxtLink>

        <NuxtLink to="/admin/albums" :class="isActive('albums')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 389.12 389.12"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M194.56,0C87.281,0,0,87.281,0,194.56s87.281,194.56,194.56,194.56s194.56-87.281,194.56-194.56S301.839,0,194.56,0z
                        M194.56,375.467c-99.753,0-180.907-81.154-180.907-180.907S94.807,13.653,194.56,13.653S375.467,94.807,375.467,194.56
                        S294.313,375.467,194.56,375.467z"
                  />
                  <path
                    d="M194.56,150.187c-24.467,0-44.373,19.907-44.373,44.373c0,24.467,19.907,44.373,44.373,44.373
                        c24.467,0,44.373-19.907,44.373-44.373C238.933,170.093,219.027,150.187,194.56,150.187z M194.56,225.28
                        c-16.94,0-30.72-13.78-30.72-30.72s13.78-30.72,30.72-30.72s30.72,13.78,30.72,30.72S211.5,225.28,194.56,225.28z"
                  />
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <path
                    d="M194.56,122.88c-39.526,0-71.68,32.154-71.68,71.68s32.154,71.68,71.68,71.68s71.68-32.154,71.68-71.68
                        S234.086,122.88,194.56,122.88z M194.56,252.587c-31.993,0-58.027-26.034-58.027-58.027s26.034-58.027,58.027-58.027
                        s58.027,26.034,58.027,58.027S226.553,252.587,194.56,252.587z"
                  />
                  <path
                    d="M194.56,150.187c-24.467,0-44.373,19.907-44.373,44.373c0,24.467,19.907,44.373,44.373,44.373
                        c24.467,0,44.373-19.907,44.373-44.373C238.933,170.093,219.027,150.187,194.56,150.187z M194.56,225.28
                        c-16.94,0-30.72-13.78-30.72-30.72s13.78-30.72,30.72-30.72s30.72,13.78,30.72,30.72S211.5,225.28,194.56,225.28z"
                  />
                </g>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M120.305,58.508c-1.932-3.241-6.12-4.308-9.359-2.374C76.559,76.607,51.494,108.947,40.366,147.2
                      c-1.053,3.62,1.027,7.407,4.647,8.46c0.633,0.186,1.28,0.273,1.906,0.273c2.961,0,5.687-1.934,6.55-4.919
                      c10.161-34.92,33.055-64.454,64.461-83.147C121.172,65.94,122.231,61.747,120.305,58.508z"
                />
              </g>
            </g>
          </svg>

          <span class="mx-4 font-medium ">Albums</span>
        </NuxtLink>

        <NuxtLink to="/admin/genres" :class="isActive('genres')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="music"><rect width="24" height="24" opacity="0" /><path d="M19 15V4a1 1 0 0 0-.38-.78 1 1 0 0 0-.84-.2l-9 2A1 1 0 0 0 8 6v8.34a3.49 3.49 0 1 0 2 3.18 4.36 4.36 0 0 0 0-.52V6.8l7-1.55v7.09a3.49 3.49 0 1 0 2 3.17 4.57 4.57 0 0 0 0-.51zM6.54 19A1.49 1.49 0 1 1 8 17.21a1.53 1.53 0 0 1 0 .3A1.49 1.49 0 0 1 6.54 19zm9-2A1.5 1.5 0 1 1 17 15.21a1.53 1.53 0 0 1 0 .3A1.5 1.5 0 0 1 15.51 17z" /></g></g></svg>
          <span class="mx-4 font-medium ">Genres</span>
        </NuxtLink>
      </nav>
    </aside>
    <section class="col-span-12 sm:col-span-9 lg:col-span-10">
      <Nuxt />
    </section>
  </div>
</template>
/* eslint-enabled */

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      isAuth: null,
      role: null,
      user: null
    }
  },
  created () {
    this.isAuth = this.$store.getters['auth/getIsAuth']
    this.role = this.$store.getters['auth/getRole']
    this.user = this.$store.getters['auth/getUser']

    this.unsubscribe = this.$store.subscribe((mutations) => {
      if (mutations.type === 'auth/ISAUTH') {
        this.isAuth = mutations.payload
      } else if (mutations.type === 'auth/ROLE') {
        this.role = mutations.payload
      } else if (mutations.type === 'auth/USER') {
        this.user = mutations.payload
      }
    })
  },
  mounted () {},
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    isActive (name) {
      if (this.$route.path.includes(name)) {
        return 'flex items-center py-2 px-2 bg-gray-700 text-gray-100 border-r-4 border-gray-100 btn-svg active'
      } else {
        return 'flex items-center py-2 px-2 text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100 btn-svg'
      }
    }
  }
}
</script>
