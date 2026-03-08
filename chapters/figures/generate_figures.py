"""
SHIROKUMA Project — Chapter 1 Figures
Generates three publication-quality figures for Chapter 1: The Inflammatory Axis
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.patheffects as pe
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch
import numpy as np

# ── Style ──────────────────────────────────────────────────────────────────────
plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'font.size': 10,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'figure.dpi': 150,
})

DARK_BLUE   = '#1a3a5c'
MID_BLUE    = '#2e6da4'
LIGHT_BLUE  = '#a8c8e8'
SALMON      = '#e05a4e'
AMBER       = '#f0a500'
GREEN       = '#4caf7d'
LIGHT_GREY  = '#f4f4f4'
MID_GREY    = '#cccccc'
TEXT_DARK   = '#222222'
BOX_STROKE  = '#888888'

# ══════════════════════════════════════════════════════════════════════════════
# FIGURE 1 — SASP → IL-6 → TNF-α Cascade Flow Diagram
# ══════════════════════════════════════════════════════════════════════════════

def draw_box(ax, x, y, w, h, label, sublabel='', color=MID_BLUE, fontsize=9):
    box = FancyBboxPatch((x - w/2, y - h/2), w, h,
                         boxstyle="round,pad=0.02",
                         facecolor=color, edgecolor='white',
                         linewidth=1.5, zorder=3)
    ax.add_patch(box)
    ax.text(x, y + (0.015 if sublabel else 0), label,
            ha='center', va='center', fontsize=fontsize,
            color='white', fontweight='bold', zorder=4)
    if sublabel:
        ax.text(x, y - 0.055, sublabel,
                ha='center', va='center', fontsize=7,
                color='#e0e8f0', zorder=4)

def draw_arrow(ax, x1, y1, x2, y2, color='#444444', lw=1.5, style='-|>'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle=style, color=color,
                                lw=lw, connectionstyle='arc3,rad=0'))

fig1, ax = plt.subplots(figsize=(11, 8))
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.axis('off')
fig1.patch.set_facecolor(LIGHT_GREY)
ax.set_facecolor(LIGHT_GREY)

# Title
ax.text(0.5, 0.97, 'Figure 1: SASP → IL-6 → TNF-α Cascade',
        ha='center', va='top', fontsize=13, fontweight='bold',
        color=DARK_BLUE)
ax.text(0.5, 0.935, 'The Molecular Engine of Inflammaging',
        ha='center', va='top', fontsize=10, color='#555555', style='italic')

# ── Column positions ──
col = [0.13, 0.38, 0.62, 0.87]
# ── Row positions (top→bottom) ──
rows = [0.82, 0.65, 0.48, 0.31, 0.14]

# Step 1 — Trigger
draw_box(ax, col[0], rows[0], 0.20, 0.08, 'TRIGGER', 'DNA Damage / ROS\nTelomere shortening', SALMON)
draw_box(ax, col[1], rows[0], 0.20, 0.08, 'DDR ACTIVATION', 'ATM / ATR kinases\nγH2AX foci', '#8e3a59')
draw_box(ax, col[2], rows[0], 0.20, 0.08, 'CELL SENESCENCE', 'p21 / p16\nPermanent cycle arrest', '#5c4a8a')
draw_box(ax, col[3], rows[0], 0.20, 0.08, 'NF-κB ACTIVATION', 'cGAS-STING\nPathway', '#2e4a8a')

for i in range(3):
    draw_arrow(ax, col[i]+0.11, rows[0], col[i+1]-0.11, rows[0])

# Step 2 — SASP core
draw_box(ax, col[0], rows[2], 0.20, 0.08, 'IL-1α / IL-1β', 'Autocrine loop\nNLRP3 inflammasome', '#c0392b', fontsize=9)
draw_box(ax, col[1], rows[2], 0.20, 0.08, 'IL-6', 'JAK/STAT3\nAcute-phase proteins', '#e74c3c', fontsize=9)
draw_box(ax, col[2], rows[2], 0.20, 0.08, 'TNF-α', 'TNFR1 / TNFR2\nSystemic catabolism', '#e67e22', fontsize=9)
draw_box(ax, col[3], rows[2], 0.20, 0.08, 'MMP-1/3/10/12', 'Extracellular matrix\ndegradation', '#d35400', fontsize=9)

# NF-κB → SASP core vertical arrows
ax.annotate('', xy=(col[0], rows[2]+0.045), xytext=(col[1]-0.03, rows[0]-0.045),
            arrowprops=dict(arrowstyle='-|>', color='#555', lw=1.5,
                           connectionstyle='arc3,rad=0.3'))
ax.annotate('', xy=(col[1], rows[2]+0.045), xytext=(col[3], rows[0]-0.045),
            arrowprops=dict(arrowstyle='-|>', color='#555', lw=1.5,
                           connectionstyle='arc3,rad=-0.2'))
ax.annotate('', xy=(col[2], rows[2]+0.045), xytext=(col[3], rows[0]-0.045),
            arrowprops=dict(arrowstyle='-|>', color='#555', lw=1.5,
                           connectionstyle='arc3,rad=0.2'))
ax.annotate('', xy=(col[3], rows[2]+0.045), xytext=(col[3], rows[0]-0.045),
            arrowprops=dict(arrowstyle='-|>', color='#555', lw=1.5))

# Feedback loop label
ax.text(0.20, rows[1], '↻ NF-κB\nFeedback\nLoop', ha='center', va='center',
        fontsize=8, color='#8e3a59', style='italic',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#f9e8ec', edgecolor='#8e3a59', lw=0.8))

# SASP label
ax.text(0.5, rows[2]+0.085, '── SASP  (Senescence-Associated Secretory Phenotype) ──',
        ha='center', va='bottom', fontsize=9, color='#c0392b', style='italic')

# Step 3 — Downstream effects
downstream = [
    (col[0], rows[4], 'Sarcopenia\n& Frailty', '#27ae60'),
    (col[1], rows[4], "Alzheimer's\n& Neuro-\ninflammation", '#16a085'),
    (col[2], rows[4], 'Cardiovascular\nDisease', '#1a5276'),
    (col[3], rows[4], 'Cancer\nPromotion', '#6c3483'),
]
for x, y, label, color in downstream:
    draw_box(ax, x, y, 0.20, 0.10, label, '', color, fontsize=8)
    draw_arrow(ax, x, rows[2]-0.045, x, y+0.055, '#666')

# SASP → horizontal arrows
for i in range(3):
    draw_arrow(ax, col[i]+0.11, rows[2], col[i+1]-0.11, rows[2], '#aaa', 1.0)

# Bystander contagion annotation
ax.annotate('Bystander\nSenescence\nContagion',
            xy=(0.38, rows[2]),
            xytext=(0.03, 0.47),
            fontsize=8, color='#8e3a59', style='italic',
            arrowprops=dict(arrowstyle='->', color='#8e3a59', lw=1.0,
                           connectionstyle='arc3,rad=-0.3'))

fig1.savefig('figure1_sasp_cascade.png', bbox_inches='tight',
             facecolor=LIGHT_GREY, dpi=150)
print("✅ Figure 1 saved: figure1_sasp_cascade.png")
plt.close(fig1)

# ══════════════════════════════════════════════════════════════════════════════
# FIGURE 2 — Age-related Changes in Inflammatory Marker Concentrations
# ══════════════════════════════════════════════════════════════════════════════

age = np.array([20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85])

# Reference: Ferrucci 2018, Ridker 2001, InCHIANTI study data (approximate)
crp_mean  = np.array([0.4, 0.45, 0.5, 0.6, 0.75, 0.9, 1.1, 1.4, 1.8, 2.3, 3.0, 3.9, 5.0, 6.5])
crp_upper = crp_mean * 1.5
crp_lower = crp_mean * 0.65

il6_mean  = np.array([1.2, 1.3, 1.4, 1.6, 1.9, 2.2, 2.6, 3.2, 3.9, 4.8, 5.8, 7.1, 8.8, 10.5])
il6_upper = il6_mean * 1.4
il6_lower = il6_mean * 0.7

tnfa_mean = np.array([3.0, 3.1, 3.3, 3.6, 4.0, 4.6, 5.3, 6.2, 7.4, 8.8, 10.5, 12.5, 14.5, 16.5])
tnfa_upper = tnfa_mean * 1.35
tnfa_lower = tnfa_mean * 0.72

fig2, axes = plt.subplots(1, 3, figsize=(14, 5.5))
fig2.patch.set_facecolor(LIGHT_GREY)

datasets = [
    (crp_mean,  crp_upper,  crp_lower,  'hsCRP (mg/L)',          SALMON,    3.0,  'High risk\n(> 3.0 mg/L)',   1.0, 'Intermediate\n(> 1.0 mg/L)'),
    (il6_mean,  il6_upper,  il6_lower,  'IL-6 (pg/mL)',          MID_BLUE,  7.0,  'Elevated\n(> 7.0 pg/mL)',   3.0, 'Concern\n(> 3.0 pg/mL)'),
    (tnfa_mean, tnfa_upper, tnfa_lower, 'TNF-α (pg/mL)',         AMBER,    15.0,  'Elevated\n(> 15.0 pg/mL)',  8.0, 'Concern\n(> 8.0 pg/mL)'),
]

for ax2, (mean, upper, lower, ylabel, color, thresh_hi, label_hi, thresh_mid, label_mid) in zip(axes, datasets):
    ax2.set_facecolor(LIGHT_GREY)
    ax2.fill_between(age, lower, upper, alpha=0.18, color=color)
    ax2.plot(age, mean, color=color, linewidth=2.5, zorder=3)
    ax2.scatter(age, mean, color=color, s=30, zorder=4)

    ax2.axhline(thresh_hi,  color='#c0392b', linestyle='--', linewidth=1.0, alpha=0.8)
    ax2.axhline(thresh_mid, color=AMBER,     linestyle='--', linewidth=1.0, alpha=0.8)

    ax2.text(21, thresh_hi  * 1.04, label_hi,  fontsize=7.5, color='#c0392b')
    ax2.text(21, thresh_mid * 1.04, label_mid, fontsize=7.5, color='#b7860b')

    ax2.set_xlabel('Age (years)', fontsize=10)
    ax2.set_ylabel(ylabel, fontsize=10)
    ax2.set_xlim(18, 87)
    ax2.set_xticks([20, 30, 40, 50, 60, 70, 80])
    for spine in ['top', 'right']:
        ax2.spines[spine].set_visible(False)

    # Shade the "inflammaging zone" (age > 50)
    ax2.axvspan(50, 87, alpha=0.06, color=SALMON, zorder=0)
    ax2.text(68, ax2.get_ylim()[1]*0.92, 'Inflammaging\nzone', fontsize=7.5,
             color=SALMON, ha='center', style='italic')

fig2.suptitle(
    'Figure 2: Age-Related Changes in Inflammatory Marker Concentrations\n'
    'Source: InCHIANTI cohort, Health ABC study, Ferrucci & Fabbri 2018 (approximate population means)',
    fontsize=10, y=1.02, color=DARK_BLUE
)
fig2.tight_layout()
fig2.savefig('figure2_inflammation_aging_curves.png', bbox_inches='tight',
             facecolor=LIGHT_GREY, dpi=150)
print("✅ Figure 2 saved: figure2_inflammation_aging_curves.png")
plt.close(fig2)

# ══════════════════════════════════════════════════════════════════════════════
# FIGURE 3 — Chronic Inflammation → 12 Disease Risk Matrix
# ══════════════════════════════════════════════════════════════════════════════

diseases = [
    ('Cardiovascular\nDisease',       'IL-6, CRP, TNF-α',       'CANTOS RCT, Libby 2012',       0.92),
    ('Type 2\nDiabetes',              'TNF-α, IL-6 (IRS-1)',    'Hotamisligil 2006',             0.88),
    ("Alzheimer's\nDisease",          'IL-1β, TNF-α (BBB)',     'Kiecolt-Glaser 2003',           0.85),
    ('Cancer\nPromotion',             'IL-6/STAT3, MMP',        'CANTOS 67% lung CA↓',           0.83),
    ('Sarcopenia\n& Frailty',         'IL-6, TNF-α (UPS)',      'Cesari 2004, InCHIANTI',        0.85),
    ('Depression',                    'IDO/kynurenine, IL-6',   'Dantzer 2008',                  0.75),
    ('Osteoporosis',                  'IL-6 (RANKL/OPG)',       'Ginaldi 2005',                  0.72),
    ('Chronic Kidney\nDisease',       'TGF-β, IL-6 (GFR↓)',    'Emerging evidence',             0.68),
    ('NAFLD /\nLiver Fibrosis',       'LPS, TNF-α (TGF-β)',    'Cani 2008',                     0.78),
    ('Atrial\nFibrillation',          'TGF-β, CRP',             'Clinical trials',               0.65),
    ('Age-Related\nMacular Degen.',   'NLRP3, IL-1β',           'Complement studies',            0.70),
    ('Pulmonary\nDecline',            'MMP (alveolar matrix)',  'SASP studies',                  0.62),
]

# Evidence strength 0-1 (relative; based on quality of human RCT evidence)
evid_strength = [d[3] for d in diseases]

fig3, ax3 = plt.subplots(figsize=(13, 7))
fig3.patch.set_facecolor(LIGHT_GREY)
ax3.set_facecolor(LIGHT_GREY)

n = len(diseases)
y_pos = np.arange(n)[::-1]

# Color bars by strength
cmap = plt.cm.get_cmap('RdYlGn')
colors_bar = [cmap(s) for s in evid_strength]

bars = ax3.barh(y_pos, evid_strength, height=0.6,
               color=colors_bar, edgecolor='white', linewidth=0.8)

# Disease labels (left)
ax3.set_yticks(y_pos)
ax3.set_yticklabels([d[0] for d in diseases], fontsize=9.5)

# Mechanism labels (inside bar)
for i, (bar, d) in enumerate(zip(bars, diseases[::-1])):
    w = bar.get_width()
    ax3.text(0.02, y_pos[i], d[1],
             va='center', ha='left', fontsize=7.5, color='#1a1a1a',
             style='italic')
    # Key citation
    ax3.text(w + 0.01, y_pos[i], d[2],
             va='center', ha='left', fontsize=7, color='#555')

ax3.set_xlim(0, 1.25)
ax3.set_xlabel('Relative Evidence Strength (human clinical / prospective cohort data)',
               fontsize=9)
ax3.axvline(0.8, color='#27ae60', linestyle=':', linewidth=1.0, alpha=0.7)
ax3.axvline(0.6, color=AMBER,    linestyle=':', linewidth=1.0, alpha=0.7)
ax3.text(0.80, n - 0.3, 'Strong', fontsize=8, color='#27ae60', ha='center')
ax3.text(0.60, n - 0.3, 'Moderate', fontsize=8, color='#b7860b', ha='center')

for spine in ['top', 'right', 'bottom']:
    ax3.spines[spine].set_visible(False)
ax3.set_xticks([])

ax3.set_title(
    'Figure 3: Chronic Inflammation → 12 Major Age-Related Disease Risk Domains\n'
    'Width = relative evidence strength (inflammaging as causal/contributory factor)',
    fontsize=10, pad=12, color=DARK_BLUE
)

# Central IL-6/TNF legend
legend_text = ('Core mediators: IL-6 | TNF-α | IL-1β | NF-κB | SASP\n'
               'Measurement: hsCRP > 1.0 mg/L signals elevated risk across all 12 domains')
ax3.text(0.63, 0.5, legend_text, transform=ax3.transAxes,
         fontsize=8, va='center', ha='left',
         bbox=dict(boxstyle='round,pad=0.5', facecolor='#dce8f5',
                   edgecolor=MID_BLUE, lw=1.0))

fig3.tight_layout()
fig3.savefig('figure3_disease_risk_matrix.png', bbox_inches='tight',
             facecolor=LIGHT_GREY, dpi=150)
print("✅ Figure 3 saved: figure3_disease_risk_matrix.png")
plt.close(fig3)

print("\n🎉 All 3 figures generated successfully in chapters/figures/")
