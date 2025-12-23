<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>XML Sitemap | Chinmaya PU and Degree College</title>
                <meta name="description" content="XML Sitemap for Chinmaya PU and Degree College - Helping search engines find our content."/>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&amp;display=swap" rel="stylesheet"/>
                <style>
                    :root {
                        --primary: #4f46e5;
                        --primary-dark: #4338ca;
                        --accent: #f59e0b;
                        --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                        --card-bg: rgba(255, 255, 255, 0.9);
                        --text-main: #1e293b;
                        --text-muted: #64748b;
                        --border: rgba(226, 232, 240, 0.8);
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Outfit', sans-serif;
                        color: var(--text-main);
                        background: var(--bg-gradient);
                        min-height: 100vh;
                        padding: 2rem 1rem;
                        line-height: 1.6;
                    }

                    .container {
                        max-width: 1000px;
                        margin: 0 auto;
                    }

                    .header {
                        text-align: center;
                        margin-bottom: 3rem;
                        padding: 2rem;
                        background: var(--card-bg);
                        backdrop-filter: blur(10px);
                        border-radius: 24px;
                        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
                        border: 1px solid var(--border);
                    }

                    .back-btn {
                        display: inline-flex;
                        align-items: center;
                        padding: 8px 16px;
                        background: white;
                        border: 1px solid var(--border);
                        border-radius: 12px;
                        color: var(--text-muted);
                        text-decoration: none;
                        font-weight: 500;
                        font-size: 0.9rem;
                        margin-bottom: 1.5rem;
                        transition: all 0.3s ease;
                    }

                    .back-btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                        transform: translateY(-2px);
                    }

                    h1 {
                        font-size: 2.5rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        background: linear-gradient(to right, var(--primary), var(--primary-dark));
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .description {
                        color: var(--text-muted);
                        font-size: 1.1rem;
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .stats {
                        display: flex;
                        justify-content: center;
                        gap: 2rem;
                        margin-top: 2rem;
                        padding-top: 2rem;
                        border-top: 1px solid var(--border);
                    }

                    .stat-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .stat-value {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--primary);
                    }

                    .stat-label {
                        font-size: 0.8rem;
                        color: var(--text-muted);
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }

                    .content-card {
                        background: var(--card-bg);
                        backdrop-filter: blur(10px);
                        border-radius: 24px;
                        overflow: hidden;
                        box-shadow: 0 20px 50px -12px rgba(0,0,0,0.1);
                        border: 1px solid var(--border);
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    th {
                        background: rgba(241, 245, 249, 0.5);
                        padding: 1.25rem 1.5rem;
                        text-align: left;
                        font-weight: 600;
                        color: var(--text-muted);
                        font-size: 0.85rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        border-bottom: 1px solid var(--border);
                    }

                    td {
                        padding: 1.25rem 1.5rem;
                        border-bottom: 1px solid var(--border);
                        vertical-align: middle;
                    }

                    tr:last-child td {
                        border-bottom: none;
                    }

                    tr:hover td {
                        background: rgba(79, 70, 229, 0.02);
                    }

                    .url-link {
                        color: var(--primary);
                        text-decoration: none;
                        font-weight: 500;
                        transition: color 0.2s;
                        display: block;
                        word-break: break-all;
                    }

                    .url-link:hover {
                        color: var(--primary-dark);
                        text-decoration: underline;
                    }

                    .priority-badge {
                        display: inline-block;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.85rem;
                        font-weight: 600;
                    }

                    .p-high { background: #dcfce7; color: #166534; }
                    .p-med { background: #e0e7ff; color: #3730a3; }
                    .p-low { background: #f1f5f9; color: #475569; }

                    .lastmod {
                        color: var(--text-muted);
                        font-size: 0.9rem;
                    }

                    footer {
                        text-align: center;
                        margin-top: 3rem;
                        color: var(--text-muted);
                        font-size: 0.9rem;
                    }

                    @media (max-width: 640px) {
                        .stats { flex-direction: column; gap: 1rem; }
                        th:nth-child(2), td:nth-child(2) { display: none; }
                        h1 { font-size: 1.8rem; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <a href="index.html" class="back-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Back to Home
                        </a>
                        <h1>XML Sitemap</h1>
                        <p class="description">
                            Generated for search engines like Google and Bing to index <strong>Chinmaya PU and Degree College</strong> website content efficiently.
                        </p>
                        <div class="stats">
                            <div class="stat-item">
                                <span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
                                <span class="stat-label">Total Pages</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">1.0</span>
                                <span class="stat-label">Index Rate</span>
                            </div>
                        </div>
                    </div>

                    <div class="content-card">
                        <table>
                            <thead>
                                <tr>
                                    <th>URL Location</th>
                                    <th>Last Modified</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sitemap:urlset/sitemap:url">
                                    <xsl:sort select="sitemap:priority" order="descending"/>
                                    <tr>
                                        <td>
                                            <a href="{sitemap:loc}" class="url-link">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </a>
                                        </td>
                                        <td>
                                            <span class="lastmod">
                                                <xsl:value-of select="sitemap:lastmod"/>
                                            </span>
                                        </td>
                                        <td>
                                            <xsl:variable name="p" select="sitemap:priority"/>
                                            <span class="priority-badge">
                                                <xsl:attribute name="class">
                                                    <xsl:choose>
                                                        <xsl:when test="$p &gt;= 0.9">priority-badge p-high</xsl:when>
                                                        <xsl:when test="$p &gt;= 0.6">priority-badge p-med</xsl:when>
                                                        <xsl:otherwise>priority-badge p-low</xsl:otherwise>
                                                    </xsl:choose>
                                                </xsl:attribute>
                                                <xsl:value-of select="$p"/>
                                            </span>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>

                    <footer>
                        &#169; <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 4)"/> Chinmaya PU and Degree College. All rights reserved.
                    </footer>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
