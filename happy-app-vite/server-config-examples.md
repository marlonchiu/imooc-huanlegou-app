# 服务器 Gzip 配置示例

本项目已配置了构建时的 gzip 和 Brotli 压缩。以下是不同服务器环境的配置示例：

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/dist;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # 启用 Brotli 压缩 (需要安装 nginx-module-brotli)
    brotli on;
    brotli_comp_level 6;
    brotli_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript;

    # 优先使用预压缩文件
    location ~* \.(js|css)$ {
        gzip_static on;
        brotli_static on;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Apache (.htaccess) 配置

```apache
# 启用 gzip 压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 启用预压缩文件
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # 检查是否存在 .br 文件
    RewriteCond %{HTTP:Accept-Encoding} br
    RewriteCond %{REQUEST_FILENAME}\.br -s
    RewriteRule ^(.*)$ $1.br [QSA]
    
    # 检查是否存在 .gz 文件
    RewriteCond %{HTTP:Accept-Encoding} gzip
    RewriteCond %{REQUEST_FILENAME}\.gz -s
    RewriteRule ^(.*)$ $1.gz [QSA]
    
    # 设置正确的 Content-Type
    RewriteRule \.css\.gz$ - [T=text/css,E=no-gzip:1]
    RewriteRule \.js\.gz$ - [T=text/javascript,E=no-gzip:1]
    RewriteRule \.css\.br$ - [T=text/css,E=no-gzip:1]
    RewriteRule \.js\.br$ - [T=text/javascript,E=no-gzip:1]
</IfModule>

# SPA 路由支持
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## Express.js 服务器配置

```javascript
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

// 启用 gzip 压缩
app.use(compression());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// SPA 路由支持
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## 压缩效果

当前构建的压缩效果：

### Gzip 压缩率
- CSS 文件: ~78% 压缩率
- JS 文件: ~69% 压缩率

### Brotli 压缩率 (更好)
- CSS 文件: ~80% 压缩率  
- JS 文件: ~72% 压缩率

### 文件大小对比
- 原始总大小: ~970 KB
- Gzip 压缩后: ~290 KB
- Brotli 压缩后: ~245 KB

## 部署建议

1. **优先使用 Brotli**: 现代浏览器都支持，压缩率更高
2. **保留 Gzip**: 作为 Brotli 的后备方案
3. **设置缓存**: 为静态资源设置长期缓存
4. **CDN 配置**: 确保 CDN 支持并启用了压缩
