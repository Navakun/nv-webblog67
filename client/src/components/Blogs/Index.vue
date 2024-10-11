<template>
    <div class="container">
        <header class="blog-header">
            <h2>All Products</h2>
            <!--ค้นหาข้อมูล-->
            <form class="search-form">
                <input type="text" v-model="search" placeholder="Search" aria-label="Search Blogs" />
            </form>
            <!--สร้าง blog-->
            <div class="create-blog">
                <button class="btn btn-success btn-sm" @click="navigateTo('/blog/create')">Add Product</button>
                <strong> จำนวนข้อมูล: </strong> {{ filteredBlogs.length }}
            </div>
            <!--ข้อมูล tag-->
            <ul class="categories">
                <li v-for="(cate, index) in category" :key="index">
                    <a @click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
                </li>
                <li class="clear"><a @click.prevent="setCategory(' ')" href="#">Clear</a></li>
            </ul>
            <div class="clearfix"></div>
        </header>
        <br>

        <transition-group name="fade">
            <div v-for="blog in filteredBlogs" :key="blog.id" class="blog-list">
                <div class="blog-pic">
                    <div class="thumbnail-pic" v-if="blog.thumbnail && blog.thumbnail !== 'null'">
                        <img :src="BASE_URL + blog.thumbnail" alt="thumbnail">
                    </div>
                </div>

                <div class="blog-info">
                    <h3>{{ blog.brand_name }}</h3>
                    <div v-html="blog.content.slice(0, 1000)"></div>
                    <p><strong>Model:</strong> {{ blog.model }}</p>
                    <p><strong>Year of Release:</strong> {{ blog.year_of_release }}</p>
                    <p><strong>Operating System:</strong> {{ blog.operating_system }}</p>
                    <p><strong>Screen Size (in inches)</strong> {{ blog.screen_size }}</p>
                    <p>
                        <button class="btn btn-sm btn-info" @click="navigateTo('/blog/' + blog.id)">View
                            Product</button>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </transition-group>

        <div v-if="filteredBlogs.length === 0 && !loading" class="empty-blog">
            *** ไม่มีข้อมูล ***
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService';
import _ from 'lodash';
import ScrollMonitor from 'scrollMonitor';

const LOAD_NUM = 3;
let pageWatcher;

export default {
    data() {
        return {
            blogs: [],
            search: '',
            BASE_URL: 'http://localhost:8081/assets/uploads/',
            allBlogs: [],
            results: [],
            category: [],
            brand_name: [],
            loading: false,
        };
    },
    async created() {
        this.allBlogs = (await BlogsService.index()).data; // ดึงข้อมูลทั้งหมดและเก็บไว้ใน allBlogs
        this.results = this.allBlogs; // เริ่มต้นผลลัพธ์ด้วยบล็อกทั้งหมด
        this.blogs = this.allBlogs.slice(0, LOAD_NUM); // แสดงบล็อกตามจำนวนที่ต้องการ
        this.populateCategories(); // Populate categories
    },
    computed: {
        filteredBlogs() {
            if (this.search.trim() === '') {
                return this.allBlogs; // แสดงทั้งหมดหากไม่มีการค้นหา
            }
            return this.allBlogs.filter(blog =>
                blog.brand_name.toLowerCase().includes(this.search.toLowerCase()) ||
                blog.model.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async deleteBlog(blog) {
            try {
                await BlogsService.delete(blog);
                this.refreshData();
            } catch (err) {
                console.log(err);
            }
        },
        async refreshData() {
            this.allBlogs = (await BlogsService.index()).data;
            this.results = this.allBlogs;
            this.blogs = this.allBlogs.slice(0, LOAD_NUM); // อัปเดตข้อมูลให้แสดงตามจำนวน
        },
        setCategory(keyword) {
            this.search = keyword === ' ' ? '' : keyword;
        },
        populateCategories() {
            this.allBlogs.forEach(blog => {
                if (!this.category.includes(blog.brand_name)) {
                    this.category.push(blog.brand_name);
                }
            });
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('th-TH', options);
        },
        appendResults() {
            if (this.blogs.length < this.results.length) {
                const additionalBlogs = this.results.slice(this.blogs.length, this.blogs.length + LOAD_NUM);
                this.blogs = this.blogs.concat(additionalBlogs);
            }
        },
    },
    updated() {
        const sens = document.querySelector('#blog-list-bottom');
        pageWatcher = ScrollMonitor.create(sens);
        pageWatcher.enterViewport(this.appendResults);
    },
    beforeUpdated() {
        if (pageWatcher) {
            pageWatcher.destroy();
            pageWatcher = null;
        }
    },
};
</script>

<style scoped>
.container {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
}

.blog-header {
    text-align: center;
    border-bottom: 2px solid #eee;
    padding-bottom: 20px;
}

.search-form input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.create-blog {
    margin-top: 15px;
    text-align: center;
}

.create-blog button {
    background-color: #28a745;
    color: white;
    border-radius: 4px;
    padding: 6px 12px;
}

.create-blog button:hover {
    background-color: #32b74f;
}

.blog-list {
    display: flex;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.thumbnail-pic img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

.blog-info {
    flex-grow: 1;
    padding-left: 20px;
}

.blog-info h3 {
    margin-top: 0;
    color: #333;
}

.blog-info p {
    margin: 5px 0;
    color: #555;
}

.categories {
    margin-top: 20px;
    padding: 0;
    list-style: none;
    text-align: center;
}

.categories li {
    display: inline-block;
    margin-right: 10px;
}

.categories li a {
    padding: 8px 12px;
    background-color: #ffeb3b;
    color: black;
    border-radius: 4px;
    text-decoration: none;
}

.categories li.clear a {
    background-color: #f44336;
    color: white;
}

.categories li.clear a:hover {
    background-color: #B22222;
}

.categories li a:hover {
    background-color: #ffc107;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

.empty-blog {
    padding: 20px;
    background-color: #e57373;
    color: white;
    text-align: center;
    margin-top: 20px;
}
</style>
