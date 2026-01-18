import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('🌱 Seeding default data for globals...')

  try {
    // Check if about_page has any data
    const aboutPageCheck = await db.run(sql`SELECT COUNT(*) as count FROM \`about_page\`;`)
    const aboutPageCount = (aboutPageCheck.results[0] as any)?.count || 0

    if (aboutPageCount === 0) {
      // Insert default about_page data
      await db.run(sql`
        INSERT INTO \`about_page\` (
          id,
          hero_section_show_headline,
          hero_section_headline,
          hero_section_show_subtext,
          hero_section_text_color,
          philosophy_title,
          philosophy_content,
          founder_name,
          founder_role,
          founder_bio,
          founder_years_active,
          updated_at,
          created_at
        ) VALUES (
          1,
          1,
          'Devoted to the Frame',
          0,
          'black',
          'Our Philosophy',
          'We believe in the power of visual storytelling. Every frame tells a story, and we are committed to crafting narratives that resonate and inspire.',
          'John Doe',
          'Founder & Creative Director',
          'With over 15 years of experience in cinematography and visual storytelling, John has worked with leading brands worldwide to create memorable visual experiences.',
          15,
          datetime('now'),
          datetime('now')
        );
      `)
      console.log('✅ About page data seeded')
    } else {
      console.log('⏭️  About page data already exists')
    }

    // Check if general has any data
    const generalCheck = await db.run(sql`SELECT COUNT(*) as count FROM \`general\`;`)
    const generalCount = (generalCheck.results[0] as any)?.count || 0

    if (generalCount === 0) {
      // Insert default general data
      await db.run(sql`
        INSERT INTO \`general\` (
          id,
          footer_text,
          updated_at,
          created_at
        ) VALUES (
          1,
          'Morerolls Studio',
          datetime('now'),
          datetime('now')
        );
      `)

      // Insert social links
      await db.run(sql`
        INSERT INTO \`general_social_links\` (_order, _parent_id, id, label, url)
        VALUES 
          (1, 1, 'social-1', 'Instagram', 'https://instagram.com/morerolls'),
          (2, 1, 'social-2', 'Vimeo', 'https://vimeo.com/morerolls'),
          (3, 1, 'social-3', 'LinkedIn', 'https://linkedin.com/company/morerolls');
      `)
      console.log('✅ General settings data seeded')
    } else {
      console.log('⏭️  General settings data already exists')
    }

    // Check if contact_page has any data
    const contactPageCheck = await db.run(sql`SELECT COUNT(*) as count FROM \`contact_page\`;`)
    const contactPageCount = (contactPageCheck.results[0] as any)?.count || 0

    if (contactPageCount === 0) {
      // Insert default contact_page data
      await db.run(sql`
        INSERT INTO \`contact_page\` (
          id,
          headline,
          email,
          phone,
          visit_us_show_section,
          visit_us_address,
          updated_at,
          created_at
        ) VALUES (
          1,
          'Let''s Create Something Extraordinary.',
          'hello@morerolls.studio',
          '+66 12 345 6789',
          1,
          '123 Creative District
Sukhumvit Road, Bangkok
Thailand 10110',
          datetime('now'),
          datetime('now')
        );
      `)
      console.log('✅ Contact page data seeded')
    } else {
      console.log('⏭️  Contact page data already exists')
    }

    console.log('🎉 Default globals seed completed!')
  } catch (error) {
    console.error('❌ Error seeding default globals:', error)
    throw error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back default globals seed...')
  
  // Delete seeded data
  await db.run(sql`DELETE FROM \`general_social_links\` WHERE _parent_id = 1;`)
  await db.run(sql`DELETE FROM \`about_page\` WHERE id = 1;`)
  await db.run(sql`DELETE FROM \`general\` WHERE id = 1;`)
  await db.run(sql`DELETE FROM \`contact_page\` WHERE id = 1;`)
  
  console.log('✅ Rollback completed')
}
