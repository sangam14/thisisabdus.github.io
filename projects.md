---
layout: post
title: projects
permalink: /projects/
---

{% for project in site.data.projects %}
<div class="project">
    <h2>{{ project.name }}</h2>
    <div><strong>description: </strong>{{ project.description }}</div>
    <div><strong>status: </strong>{{ project.status }}</div>
    <div><strong>tech used: </strong>{{ project.tech_stack }}</div>
    <div>
        <strong>external: </strong>
        {% if project.url.repo %}
            <a href="{{ project.url.repo }}">Repo</a>
        {% endif %}
        {% if project.url.demo %}
            <a href="{{ project.url.demo }}">Demo</a>
        {% endif %}
        {% if project.url.download %}
            <a href="{{ project.url.download }}">Download</a>
        {% endif %}
    </div>
</div>
{% endfor %}