"""Generates the downloadable CV PDF from the data in content.js.

Run manually with: python3 scripts/generate_cv_pdf.py
Re-run this after editing content.js so the downloadable PDF stays in sync
with the website content.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import ParagraphStyle

INK = HexColor("#0b173a")
INK_SOFT = HexColor("#26395f")
MUTED = HexColor("#637293")
BLUE = HexColor("#2764ff")
LINE = HexColor("#c6d5f5")

OUTPUT_PATH = "assets/Abrar-Naufal-Prasetya-CV.pdf"

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=20 * mm,
    rightMargin=20 * mm,
    topMargin=14 * mm,
    bottomMargin=14 * mm,
    title="Abrar Naufal Prasetya - CV",
    author="Abrar Naufal Prasetya",
)

name_style = ParagraphStyle(
    "Name", fontName="Helvetica-Bold", fontSize=20, textColor=INK,
    leading=23, spaceAfter=1,
)
role_style = ParagraphStyle(
    "Role", fontName="Helvetica", fontSize=10.5, textColor=BLUE,
    leading=13, spaceAfter=5,
)
contact_style = ParagraphStyle(
    "Contact", fontName="Helvetica", fontSize=9, textColor=MUTED,
    leading=12, spaceAfter=0,
)
section_style = ParagraphStyle(
    "Section", fontName="Helvetica-Bold", fontSize=10.8, textColor=BLUE,
    leading=13, spaceBefore=9, spaceAfter=4, alignment=TA_LEFT,
)
body_style = ParagraphStyle(
    "Body", fontName="Helvetica", fontSize=9.2, textColor=INK_SOFT,
    leading=12.5, spaceAfter=3,
)
job_title_style = ParagraphStyle(
    "JobTitle", fontName="Helvetica-Bold", fontSize=9.8, textColor=INK,
    leading=12,
)
job_org_style = ParagraphStyle(
    "JobOrg", fontName="Helvetica", fontSize=9, textColor=MUTED,
    leading=12, spaceAfter=5,
)
job_period_style = ParagraphStyle(
    "JobPeriod", fontName="Helvetica-Bold", fontSize=9, textColor=BLUE,
    leading=13,
)
skill_style = ParagraphStyle(
    "Skill", fontName="Helvetica", fontSize=9.3, textColor=INK_SOFT, leading=13,
)

story = []

story.append(Paragraph("Abrar Naufal Prasetya, S.T.", name_style))
story.append(Paragraph(
    "Geospatial &amp; Government Data Practitioner &mdash; GIS / Village Information Systems / "
    "Climate &amp; Disaster Risk",
    role_style,
))
story.append(Paragraph(
    "Jakarta, Indonesia &nbsp;&bull;&nbsp; abrarnaufalprasetya@gmail.com &nbsp;&bull;&nbsp; "
    "linkedin.com/in/abrar-naufal-prasetya-367b75161",
    contact_style,
))
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=0))

story.append(Paragraph("PROFILE", section_style))
story.append(Paragraph(
    "Geospatial and government data practitioner working at the intersection of GIS, village "
    "information systems, climate &amp; disaster risk, and evidence-based rural development. "
    "Research direction explores GIS-based disaster risk assessment, satellite-based geospatial "
    "indicators, village-level climate risk mapping, and disaster-resilient rural planning, linking "
    "terrain, hazard, environmental, socio-economic, and governance indicators to improve spatial "
    "prioritization and the targeting of Village Fund interventions.",
    body_style,
))

story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))

career = [
    ("Jan 2025 &mdash; Present", "First Expert Computer Systems Analyst",
     "Pusdatin, Ministry of Villages and Development of Disadvantaged Regions"),
    ("Feb 2024 &mdash; Jan 2025", "Policy Analyst",
     "Ministry of Villages, Development of Disadvantaged Regions, and Transmigration"),
    ("May 2022 &mdash; Feb 2024", "Natural Resources Data Analyst",
     "Ministry of Villages, Development of Disadvantaged Regions, and Transmigration"),
]

for period, title, org in career:
    row = Table(
        [[Paragraph(title, job_title_style), Paragraph(period, job_period_style)]],
        colWidths=[125 * mm, 40 * mm],
    )
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(row)
    story.append(Paragraph(org, job_org_style))

story.append(Paragraph("SELECTED PROJECTS", section_style))
projects = [
    ("Village Spatial Data &mdash; WebGIS IRID Prototype (2026&mdash;Present)",
     "Self-directed research: a Mapbox/GIS prototype visualizing village-level climate risk index "
     "data, preparing a broader research direction integrating spatial village data with the "
     "Village Information System."),
    ("Spatial Data &amp; Application Support (2025&mdash;Present)",
     "Supporting data access services, thematic mapping, application planning, system testing, "
     "and coordination with third-party developers for ministry-level information systems."),
    ("Disaster Resilience Policy Brief Support (2022&mdash;2025)",
     "Contributed to policy-brief development on disaster resilience, mitigation, and "
     "disadvantaged-region development, including field-based information gathering and "
     "stakeholder discussions in East Nusa Tenggara."),
]
for title, text in projects:
    story.append(Paragraph(f"<b>{title}</b><br/>{text}", body_style))

story.append(Paragraph("EDUCATION", section_style))
story.append(Paragraph(
    "<b>Institut Teknologi Bandung (ITB)</b> &mdash; Bachelor of Engineering, Geological Engineering "
    "&nbsp;&bull;&nbsp; 2013&mdash;2020 &nbsp;&bull;&nbsp; GPA 3.35 / 4.00<br/>"
    "Background in geological mapping, geomorphology, structural geology, hydrogeology, "
    "engineering geology, and terrain interpretation.",
    body_style,
))

story.append(Paragraph("SKILLS &amp; TOOLS", section_style))
skills = [
    "QGIS", "ArcGIS", "Mapbox", "GeoJSON", "WebGIS",
    "HTML / CSS / JavaScript", "Excel / Google Sheets", "Data Cleaning",
    "Tabular–Spatial Integration", "Thematic Mapping", "Geological Mapping", "Geomorphology",
]
story.append(Paragraph(" &nbsp;&bull;&nbsp; ".join(skills), skill_style))

story.append(Paragraph("HIGHLIGHTS", section_style))
highlights = [
    "2026 &mdash; LPDP Scholarship Candidate / Sponsored Applicant; Letter of Sponsorship for "
    "Master&rsquo;s applications to Tohoku University",
    "2025 &mdash; Indonesian Agricultural and Rural Development Officials Capacity Building "
    "Workshop, Beijing",
    "2025 &mdash; 3rd Place, Ministry of Villages and Development of Disadvantaged Regions "
    "English Speech Contest",
    "2025 &mdash; Cybersecurity Awareness in Electronic-Based Government Systems &mdash; "
    "Digital Talent Scholarship",
    "2022 &mdash; Second Best Participant, Basic Training for Civil Servant Candidates",
    "IELTS 6.5 (Academic English)",
]
for item in highlights:
    story.append(Paragraph(f"&bull;&nbsp; {item}", body_style))

doc.build(story)
print(f"Wrote {OUTPUT_PATH}")
